import { createWorker } from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
  words: Array<{
    text: string;
    confidence: number;
    bbox: {
      x0: number;
      y0: number;
      x1: number;
      y1: number;
    };
  }>;
}

export class OCRService {
  private static worker: Tesseract.Worker | null = null;
  private static currentOnProgress: ((progress: number) => void) | null = null;

  // Initialize Tesseract worker
  static async initializeWorker(): Promise<Tesseract.Worker> {
    if (this.worker) {
      return this.worker;
    }

    this.worker = await createWorker('eng', 1, {
      logger: m => {
        if (m.status === 'recognizing text') {
          console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          if (OCRService.currentOnProgress) {
            OCRService.currentOnProgress(m.progress);
          }
        }
      }
    });

    // Configure for medical text recognition
    await this.worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:-/() ',
      tessedit_pageseg_mode: '6', // Uniform block of text
      preserve_interword_spaces: '1',
    });

    return this.worker;
  }

  // Process image with advanced OCR
  static async processImage(
    imageFile: File,
    onProgress?: (progress: number) => void
  ): Promise<OCRResult> {
    try {
      OCRService.currentOnProgress = onProgress || null;
      
      const worker = await this.initializeWorker();
      
      // Create image URL
      const imageUrl = URL.createObjectURL(imageFile);
      
      // Preprocess image for better OCR results
      const preprocessedImage = await this.preprocessImage(imageUrl);
      
      // Perform OCR with progress tracking
      const { data } = await worker.recognize(preprocessedImage);

      // Clean up
      URL.revokeObjectURL(imageUrl);
      if (preprocessedImage !== imageUrl) {
        URL.revokeObjectURL(preprocessedImage);
      }

      // Extract word-level information
      const words = data.words?.map(word => ({
        text: word.text,
        confidence: word.confidence,
        bbox: word.bbox
      })) || [];

      return {
        text: data.text,
        confidence: data.confidence,
        words
      };

    } catch (error) {
      console.error('OCR processing failed:', error);
      throw new Error('Failed to process image with OCR');
    } finally {
      OCRService.currentOnProgress = null;
    }
  }

  // Preprocess image for better OCR results
  private static async preprocessImage(imageUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        if (!ctx) {
          resolve(imageUrl);
          return;
        }

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply image enhancements
        for (let i = 0; i < data.length; i += 4) {
          // Convert to grayscale
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          
          // Apply contrast enhancement
          const contrast = 1.5;
          const enhanced = ((gray - 128) * contrast) + 128;
          
          // Apply threshold for better text recognition
          const threshold = enhanced > 128 ? 255 : 0;
          
          data[i] = threshold;     // Red
          data[i + 1] = threshold; // Green
          data[i + 2] = threshold; // Blue
          // Alpha channel remains unchanged
        }

        // Put processed image data back
        ctx.putImageData(imageData, 0, 0);

        // Convert to blob URL
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            resolve(imageUrl);
          }
        }, 'image/png');
      };

      img.onerror = () => resolve(imageUrl);
      img.src = imageUrl;
    });
  }

  // Cleanup worker
  static async cleanup(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }

  // Process multiple images in batch
  static async processBatch(
    imageFiles: File[],
    onProgress?: (fileIndex: number, progress: number) => void
  ): Promise<OCRResult[]> {
    const results: OCRResult[] = [];
    
    for (let i = 0; i < imageFiles.length; i++) {
      const result = await this.processImage(
        imageFiles[i],
        (progress) => onProgress?.(i, progress)
      );
      results.push(result);
    }
    
    return results;
  }
}