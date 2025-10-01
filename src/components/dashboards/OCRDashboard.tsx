import React, { useState, useCallback, useRef } from 'react';
import { 
  Scan, 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye, 
  Download,
  Trash2,
  Camera,
  Image as ImageIcon,
  Loader,
  Search,
  Info,
  Pill,
  BookOpen,
  Zap,
  Brain,
  Activity,
  Settings
} from 'lucide-react';
import { 
  medicineDatabase, 
  findMedicineByName, 
  searchMedicinesByPartialName,
  MedicineInfo
} from '../../data/medicineDatabase';
import { OCRService } from '../../services/ocrService';
import { AIService } from '../../services/aiService';

interface ExtractedMedicine {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  confidence: number;
  medicineInfo?: MedicineInfo;
}

interface OCRResult {
  id: number;
  fileName: string;
  processedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  confidence: number;
  extractedText: string;
  medicines: ExtractedMedicine[];
  aiProvider?: string;
  processingTime?: number;
}

const OCRDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('process');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineInfo | null>(null);
  const [aiProvider, setAiProvider] = useState<'google' | 'groq' | 'multiple'>('multiple');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [processingHistory, setProcessingHistory] = useState<OCRResult[]>([
    {
      id: 1,
      fileName: 'prescription_001.jpg',
      processedAt: '2024-01-18 10:30 AM',
      status: 'verified',
      confidence: 94,
      extractedText: 'Patient: John Smith\nDate: 2024-01-15\nRx: Amoxicillin 500mg - Take 1 tablet twice daily for 7 days\nParacetamol 500mg - Take 1 tablet every 6 hours as needed',
      medicines: [
        { 
          name: 'Amoxicillin', 
          dosage: '500mg', 
          frequency: 'Twice daily', 
          duration: '7 days', 
          confidence: 96,
          medicineInfo: findMedicineByName('Amoxicillin') || undefined
        },
        { 
          name: 'Paracetamol', 
          dosage: '500mg', 
          frequency: 'Every 6 hours', 
          duration: 'As needed', 
          confidence: 92,
          medicineInfo: findMedicineByName('Paracetamol') || undefined
        }
      ],
      aiProvider: 'Google AI',
      processingTime: 3.2
    },
    {
      id: 2,
      fileName: 'prescription_002.jpg',
      processedAt: '2024-01-18 09:15 AM',
      status: 'pending',
      confidence: 87,
      extractedText: 'Patient: Emily Davis\nDate: 2024-01-16\nRx: Lisinopril 10mg - Take 1 tablet daily\nAspirin 81mg - Take 1 tablet daily',
      medicines: [
        { 
          name: 'Lisinopril', 
          dosage: '10mg', 
          frequency: 'Once daily', 
          duration: 'Ongoing', 
          confidence: 89,
          medicineInfo: findMedicineByName('Lisinopril') || undefined
        },
        { 
          name: 'Aspirin', 
          dosage: '81mg', 
          frequency: 'Once daily', 
          duration: 'Ongoing', 
          confidence: 85,
          medicineInfo: findMedicineByName('Aspirin') || undefined
        }
      ],
      aiProvider: 'Groq',
      processingTime: 2.8
    }
  ]);

  // Enhanced OCR processing with AI integration
  const processOCRWithAI = async (extractedText: string): Promise<ExtractedMedicine[]> => {
    try {
      let aiResult;
      
      // Use selected AI provider
      switch (aiProvider) {
        case 'google':
          aiResult = await AIService.analyzeWithGoogleAI(extractedText);
          break;
        case 'groq':
          aiResult = await AIService.analyzeWithGroq(extractedText);
          break;
        case 'multiple':
        default:
          aiResult = await AIService.analyzeWithMultipleAI(extractedText);
          break;
      }
      
      // Enhance AI results with database matching
      const enhancedMedicines = aiResult.extractedMedicines.map(medicine => {
        // Try exact match first
        let medicineInfo = findMedicineByName(medicine.name);
        
        // If no exact match, try partial matching
        if (!medicineInfo) {
          const partialMatches = searchMedicinesByPartialName(medicine.name);
          if (partialMatches.length > 0) {
            medicineInfo = partialMatches[0];
            // Update medicine name to match database
            medicine.name = medicineInfo.name;
          }
        }
        
        // Enhance confidence based on database match
        if (medicineInfo) {
          medicine.confidence = Math.min(medicine.confidence + 10, 99);
        }
        
        return {
          ...medicine,
          medicineInfo
        };
      });
      
      return enhancedMedicines;
      
    } catch (error) {
      console.error('AI processing failed:', error);
      // Fallback to basic pattern matching
      return basicPatternMatching(extractedText);
    }
  };

  // Fallback pattern matching
  const basicPatternMatching = (extractedText: string): ExtractedMedicine[] => {
    const medicines: ExtractedMedicine[] = [];
    const lines = extractedText.split('\n');
    
    const medicinePatterns = [
      /([A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+(?:\.\d+)?(?:mg|mcg|g|ml|iu|units?))/gi,
      /(?:tab|tablet|cap|capsule|syrup|injection)[\s:]*([A-Za-z\s]+?)(?:\s+)(\d+(?:\.\d+)?(?:mg|mcg|g|ml|iu|units?))/gi
    ];

    for (const line of lines) {
      if (line.toLowerCase().includes('patient:') || 
          line.toLowerCase().includes('date:') || 
          line.toLowerCase().includes('dr.') ||
          line.trim().length < 5) {
        continue;
      }

      for (const pattern of medicinePatterns) {
        const matches = [...line.matchAll(pattern)];
        
        for (const match of matches) {
          let medicineName = '';
          let dosage = '';
          
          if (match[1] && match[2]) {
            medicineName = match[1].trim();
            dosage = match[2].trim();
          }
          
          if (medicineName && medicineName.length > 2) {
            medicineName = medicineName.replace(/^(tab|tablet|cap|capsule|syrup|injection|rx)\s*/i, '');
            
            let medicineInfo = findMedicineByName(medicineName);
            
            if (!medicineInfo) {
              const partialMatches = searchMedicinesByPartialName(medicineName);
              if (partialMatches.length > 0) {
                medicineInfo = partialMatches[0];
                medicineName = medicineInfo.name;
              }
            }
            
            let frequency = '';
            const frequencyMatch = line.match(/(once|twice|three times|four times|bid|tid|qid|every \d+ hours|daily|morning|evening)/i);
            if (frequencyMatch) {
              frequency = frequencyMatch[0];
            }
            
            let duration = '';
            const durationMatch = line.match(/(\d+\s*(?:days?|weeks?|months?)|as needed|ongoing)/i);
            if (durationMatch) {
              duration = durationMatch[0];
            }
            
            let confidence = 70;
            if (medicineInfo) confidence += 20;
            if (dosage) confidence += 5;
            if (frequency) confidence += 3;
            if (duration) confidence += 2;
            
            medicines.push({
              name: medicineName,
              dosage: dosage || 'Not specified',
              frequency: frequency || 'As directed',
              duration: duration || 'Not specified',
              confidence: Math.min(confidence, 99),
              medicineInfo
            });
          }
        }
      }
    }
    
    return medicines.filter((medicine, index, self) =>
      index === self.findIndex(m => m.name.toLowerCase() === medicine.name.toLowerCase())
    );
  };

  const handleFileUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setOcrResult(null);
    } else {
      alert('Please upload a valid image file (JPG, PNG, etc.)');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const processOCR = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProcessingProgress(0);
    
    const startTime = Date.now();
    
    try {
      // Step 1: OCR Processing (40% of progress)
      setProcessingProgress(10);
      const ocrResult = await OCRService.processImage(
        uploadedFile,
        (progress) => setProcessingProgress(10 + (progress * 30))
      );
      
      setProcessingProgress(40);
      
      // Step 2: AI Analysis (40% of progress)
      const aiMedicines = await processOCRWithAI(ocrResult.text);
      setProcessingProgress(80);
      
      // Step 3: Database Enhancement (20% of progress)
      const enhancedMedicines = aiMedicines.map(medicine => {
        if (!medicine.medicineInfo) {
          const partialMatches = searchMedicinesByPartialName(medicine.name);
          if (partialMatches.length > 0) {
            return {
              ...medicine,
              medicineInfo: partialMatches[0],
              name: partialMatches[0].name,
              confidence: Math.min(medicine.confidence + 5, 99)
            };
          }
        }
        return medicine;
      });
      
      setProcessingProgress(100);
      
      const processingTime = (Date.now() - startTime) / 1000;
      
      const mockResult: OCRResult = {
        id: Date.now(),
        fileName: uploadedFile.name,
        processedAt: new Date().toLocaleString(),
        status: 'pending',
        confidence: Math.max(ocrResult.confidence, 75),
        extractedText: ocrResult.text,
        medicines: enhancedMedicines,
        aiProvider: aiProvider === 'multiple' ? 'Multiple AI' : aiProvider === 'google' ? 'Google AI' : 'Groq',
        processingTime
      };

      setOcrResult(mockResult);
      
    } catch (error) {
      console.error('OCR processing failed:', error);
      alert('OCR processing failed. Please try again with a clearer image.');
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const saveResult = () => {
    if (ocrResult) {
      setProcessingHistory([ocrResult, ...processingHistory]);
      setOcrResult(null);
      setUploadedFile(null);
      setPreviewUrl(null);
      alert('OCR result saved successfully!');
    }
  };

  const verifyResult = (id: number) => {
    setProcessingHistory(history =>
      history.map(item =>
        item.id === id ? { ...item, status: 'verified' } : item
      )
    );
    alert('Prescription verified successfully!');
  };

  const rejectResult = (id: number) => {
    if (confirm('Are you sure you want to reject this OCR result?')) {
      setProcessingHistory(history =>
        history.map(item =>
          item.id === id ? { ...item, status: 'rejected' } : item
        )
      );
      alert('OCR result rejected.');
    }
  };

  const deleteResult = (id: number) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setProcessingHistory(history => history.filter(item => item.id !== id));
      alert('Record deleted successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredMedicines = medicineDatabase.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderProcessTab = () => (
    <div className="space-y-6">
      {/* AI Configuration */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Brain className="w-6 h-6 mr-2" />
          AI-Powered OCR Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <label className="block text-sm font-medium mb-2">AI Provider</label>
            <select
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value as 'google' | 'groq' | 'multiple')}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="multiple" className="text-gray-900">Multiple AI (Best Results)</option>
              <option value="google" className="text-gray-900">Google AI (Gemini)</option>
              <option value="groq" className="text-gray-900">Groq (Mixtral)</option>
            </select>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-medium mb-1">Database Size</p>
            <p className="text-2xl font-bold">{medicineDatabase.length}+</p>
            <p className="text-xs opacity-75">Trained medicines</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm font-medium mb-1">OCR Engine</p>
            <p className="text-lg font-semibold">Tesseract.js</p>
            <p className="text-xs opacity-75">Advanced recognition</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Advanced Prescription OCR Processing
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Upload prescription images for AI-powered text extraction and medicine identification
          </p>
        </div>
        <div className="p-6">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop prescription image here
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse files (JPG, PNG supported)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <Camera className="w-4 h-4 mr-2" />
                Choose File
              </label>
            </div>
          </div>

          {/* Preview Section */}
          {previewUrl && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Image Preview & Processing</h4>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src={previewUrl}
                    alt="Prescription preview"
                    className="w-48 h-64 object-cover rounded-lg border border-gray-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">File Information</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Name:</span> {uploadedFile?.name}</p>
                      <p><span className="font-medium">Size:</span> {uploadedFile ? (uploadedFile.size / 1024 / 1024).toFixed(2) : 0} MB</p>
                      <p><span className="font-medium">Type:</span> {uploadedFile?.type}</p>
                      <p><span className="font-medium">AI Provider:</span> {aiProvider === 'multiple' ? 'Multiple AI' : aiProvider === 'google' ? 'Google AI' : 'Groq'}</p>
                    </div>
                  </div>
                  
                  {isProcessing && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Processing Progress</span>
                        <span className="text-sm text-gray-500">{processingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${processingProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {processingProgress < 40 ? 'Extracting text with Tesseract OCR...' :
                         processingProgress < 80 ? 'Analyzing with AI...' :
                         'Matching with medicine database...'}
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={processOCR}
                    disabled={isProcessing}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing with AI...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Process with Advanced AI OCR
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OCR Results */}
          {ocrResult && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">AI OCR Results</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Confidence:</span>
                      <span className={`font-bold ${getConfidenceColor(ocrResult.confidence)}`}>
                        {ocrResult.confidence}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Pill className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Medicines:</span>
                      <span className="font-bold text-blue-600">{ocrResult.medicines.length}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">AI:</span>
                      <span className="font-bold text-purple-600">{ocrResult.aiProvider}</span>
                    </div>
                    {ocrResult.processingTime && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">Time:</span>
                        <span className="font-bold text-gray-600">{ocrResult.processingTime.toFixed(1)}s</span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={saveResult}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Save Result
                    </button>
                    <button
                      onClick={() => setOcrResult(null)}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                    >
                      Discard
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Extracted Text</h5>
                    <div className="bg-white rounded border p-3">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {ocrResult.extractedText}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">AI-Identified Medicines with Database Match</h5>
                    <div className="space-y-3">
                      {ocrResult.medicines.map((medicine, index) => (
                        <div key={index} className="bg-white rounded border p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <p className="font-medium text-gray-900">{medicine.name}</p>
                                {medicine.medicineInfo && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    ✓ Database Match
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                  <p><span className="font-medium">Dosage:</span> {medicine.dosage}</p>
                                  <p><span className="font-medium">Frequency:</span> {medicine.frequency}</p>
                                  <p><span className="font-medium">Duration:</span> {medicine.duration}</p>
                                </div>
                                {medicine.medicineInfo && (
                                  <div>
                                    <p><span className="font-medium">Category:</span> {medicine.medicineInfo.category}</p>
                                    <p><span className="font-medium">Generic:</span> {medicine.medicineInfo.genericName}</p>
                                    <p className="text-xs text-gray-500 mt-1">{medicine.medicineInfo.description}</p>
                                  </div>
                                )}
                              </div>
                              {medicine.medicineInfo && medicine.medicineInfo.sideEffects.length > 0 && (
                                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                  <p className="text-xs font-medium text-yellow-800">⚠️ Common Side Effects:</p>
                                  <p className="text-xs text-yellow-700">
                                    {medicine.medicineInfo.sideEffects.slice(0, 3).join(', ')}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <span className={`text-sm font-medium ${getConfidenceColor(medicine.confidence)}`}>
                                {medicine.confidence}%
                              </span>
                              {medicine.medicineInfo && (
                                <button
                                  onClick={() => setSelectedMedicine(medicine.medicineInfo!)}
                                  className="block mt-1 text-xs text-blue-600 hover:text-blue-800"
                                >
                                  View Details
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Processing Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2 flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          Advanced OCR & AI Tips
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Uses Tesseract.js for advanced optical character recognition</li>
          <li>• AI-powered analysis with Google AI (Gemini) and Groq (Mixtral) models</li>
          <li>• Comprehensive database of {medicineDatabase.length}+ medicines with detailed information</li>
          <li>• Automatic image preprocessing for better text recognition</li>
          <li>• Real-time confidence scoring and medicine matching</li>
          <li>• For best results: use high-resolution images with good lighting</li>
        </ul>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Processing History ({processingHistory.length} records)
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {processingHistory.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{record.fileName}</p>
                    <p className="text-sm text-gray-500">Processed: {record.processedAt}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                      <span className={`text-sm font-medium ${getConfidenceColor(record.confidence)}`}>
                        {record.confidence}% confidence
                      </span>
                      <span className="text-xs text-gray-500">
                        {record.medicines.length} medicines found
                      </span>
                      {record.aiProvider && (
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                          {record.aiProvider}
                        </span>
                      )}
                      {record.processingTime && (
                        <span className="text-xs text-gray-500">
                          {record.processingTime}s
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {record.status === 'pending' && (
                      <>
                        <button
                          onClick={() => verifyResult(record.id)}
                          className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                          title="Verify"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => rejectResult(record.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteResult(record.id)}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Extracted Text</h5>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-600 line-clamp-3">
                        {record.extractedText}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">
                      AI-Identified Medicines ({record.medicines.length})
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {record.medicines.map((medicine, index) => (
                        <div key={index} className="bg-gray-50 rounded p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{medicine.name}</p>
                              <p className="text-xs text-gray-600">
                                {medicine.dosage} - {medicine.frequency}
                              </p>
                              <p className="text-xs text-gray-500">
                                Duration: {medicine.duration}
                              </p>
                              {medicine.medicineInfo && (
                                <p className="text-xs text-green-600 mt-1">
                                  ✓ {medicine.medicineInfo.category}
                                </p>
                              )}
                            </div>
                            <span className={`text-xs font-medium ${getConfidenceColor(medicine.confidence)}`}>
                              {medicine.confidence}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {processingHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No processing history available.</p>
              <p className="text-sm">Start by processing some prescription images.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDatabaseTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Medicine Database ({medicineDatabase.length} medicines)
            </h3>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medicines by name, generic name, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredMedicines.slice(0, 50).map((medicine) => (
              <div
                key={medicine.id}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedMedicine(medicine)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{medicine.name}</p>
                    <p className="text-sm text-gray-600">{medicine.genericName}</p>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mt-1">
                      {medicine.category}
                    </span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredMedicines.length > 50 && (
            <p className="text-center text-gray-500 mt-4">
              Showing first 50 results. Use search to find specific medicines.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Database</p>
              <p className="text-2xl font-bold text-gray-900">{medicineDatabase.length}+</p>
              <p className="text-xs text-gray-500 mt-1">Trained medicines</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Processed</p>
              <p className="text-2xl font-bold text-gray-900">{processingHistory.length}</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Scan className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-green-600">
                {processingHistory.filter(r => r.status === 'verified').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Ready for use</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Confidence</p>
              <p className="text-2xl font-bold text-gray-900">
                {processingHistory.length > 0 
                  ? Math.round(processingHistory.reduce((sum, r) => sum + r.confidence, 0) / processingHistory.length)
                  : 0}%
              </p>
              <p className="text-xs text-gray-500 mt-1">AI accuracy</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('process')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'process'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              AI OCR Processing
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Processing History
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === 'database'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Medicine Database
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'process' && renderProcessTab()}
      {activeTab === 'history' && renderHistoryTab()}
      {activeTab === 'database' && renderDatabaseTab()}

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                {selectedMedicine.name} Details
              </h3>
              <button
                onClick={() => setSelectedMedicine(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Generic Name</label>
                  <p className="text-gray-900">{selectedMedicine.genericName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="text-gray-900">{selectedMedicine.category}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedMedicine.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Common Dosages</label>
                <div className="flex flex-wrap gap-2">
                  {selectedMedicine.commonDosages.map((dosage, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                      {dosage}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Common Frequencies</label>
                <div className="flex flex-wrap gap-2">
                  {selectedMedicine.commonFrequencies.map((frequency, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                      {frequency}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Side Effects</label>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {selectedMedicine.sideEffects.map((effect, index) => (
                      <li key={index}>• {effect}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraindications</label>
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <ul className="text-sm text-red-800 space-y-1">
                    {selectedMedicine.contraindications.map((contraindication, index) => (
                      <li key={index}>• {contraindication}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Names</label>
                <div className="flex flex-wrap gap-2">
                  {selectedMedicine.aliases.map((alias, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                      {alias}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedMedicine(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRDashboard;