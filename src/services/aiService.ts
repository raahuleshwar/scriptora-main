import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

// Initialize AI services
const googleAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY || '');
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true
});

export interface AIAnalysisResult {
  extractedMedicines: Array<{
    name: string;
    dosage?: string;
    frequency?: string;
    duration?: string;
    confidence: number;
  }>;
  patientInfo?: {
    name?: string;
    age?: string;
    date?: string;
  };
  doctorInfo?: {
    name?: string;
    signature?: boolean;
  };
  confidence: number;
  rawAnalysis: string;
}

export class AIService {
  // Google AI Analysis
  static async analyzeWithGoogleAI(extractedText: string): Promise<AIAnalysisResult> {
    try {
      if (!import.meta.env.VITE_GOOGLE_AI_API_KEY || import.meta.env.VITE_GOOGLE_AI_API_KEY === 'your_google_ai_api_key_here') {
        console.warn('Google AI API key not configured, using fallback parsing');
        return this.fallbackParsing(extractedText, 'Google AI API key not configured - using pattern matching');
      }

      const model = googleAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `
        Analyze this medical prescription text and extract medicine information in JSON format:
        
        Text: "${extractedText}"
        
        Please extract:
        1. Medicine names (brand or generic)
        2. Dosages (mg, mcg, ml, etc.)
        3. Frequencies (daily, twice daily, BID, TID, etc.)
        4. Duration (days, weeks, months, as needed)
        5. Patient information if available
        6. Doctor information if available
        
        Return ONLY a valid JSON object with this structure:
        {
          "extractedMedicines": [
            {
              "name": "medicine_name",
              "dosage": "dosage_amount",
              "frequency": "frequency_text",
              "duration": "duration_text",
              "confidence": 0.95
            }
          ],
          "patientInfo": {
            "name": "patient_name",
            "age": "age",
            "date": "prescription_date"
          },
          "doctorInfo": {
            "name": "doctor_name",
            "signature": true
          },
          "confidence": 0.90,
          "rawAnalysis": "brief_analysis_summary"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.warn('Failed to parse Google AI JSON response:', parseError);
      }
      
      // Fallback parsing
      return this.fallbackParsing(extractedText, text);
      
    } catch (error) {
      console.error('Google AI analysis failed:', error);
      return this.fallbackParsing(extractedText, 'Google AI analysis failed');
    }
  }

  // Groq AI Analysis
  static async analyzeWithGroq(extractedText: string): Promise<AIAnalysisResult> {
    try {
      if (!import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GROQ_API_KEY === 'your_groq_api_key_here') {
        console.warn('Groq API key not configured, using fallback parsing');
        return this.fallbackParsing(extractedText, 'Groq API key not configured - using pattern matching');
      }

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a medical AI assistant specialized in analyzing prescription text. 
                     Extract medicine information accurately and return only valid JSON.`
          },
          {
            role: 'user',
            content: `
              Analyze this prescription text and extract medicine information:
              
              "${extractedText}"
              
              Return ONLY valid JSON with this exact structure:
              {
                "extractedMedicines": [
                  {
                    "name": "medicine_name",
                    "dosage": "dosage_with_unit",
                    "frequency": "how_often",
                    "duration": "how_long",
                    "confidence": 0.95
                  }
                ],
                "patientInfo": {
                  "name": "patient_name_if_found",
                  "age": "age_if_found",
                  "date": "date_if_found"
                },
                "doctorInfo": {
                  "name": "doctor_name_if_found",
                  "signature": true
                },
                "confidence": 0.90,
                "rawAnalysis": "brief_summary"
              }
            `
          }
        ],
        model: 'mixtral-8x7b-32768',
        temperature: 0.1,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content || '';
      
      // Try to parse JSON response
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.warn('Failed to parse Groq JSON response:', parseError);
      }
      
      return this.fallbackParsing(extractedText, response);
      
    } catch (error) {
      console.error('Groq analysis failed:', error);
      return this.fallbackParsing(extractedText, 'Groq analysis failed');
    }
  }

  // Fallback parsing when AI APIs fail
  private static fallbackParsing(extractedText: string, analysis: string): AIAnalysisResult {
    const medicines: Array<{
      name: string;
      dosage?: string;
      frequency?: string;
      duration?: string;
      confidence: number;
    }> = [];

    // Basic pattern matching as fallback
    const medicinePatterns = [
      /([A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+(?:\.\d+)?(?:mg|mcg|g|ml|iu|units?))/gi,
      /(?:tab|tablet|cap|capsule|syrup|injection)[\s:]*([A-Za-z\s]+?)(?:\s+)(\d+(?:\.\d+)?(?:mg|mcg|g|ml|iu|units?))/gi
    ];

    for (const pattern of medicinePatterns) {
      const matches = [...extractedText.matchAll(pattern)];
      for (const match of matches) {
        if (match[1] && match[2]) {
          medicines.push({
            name: match[1].trim(),
            dosage: match[2].trim(),
            frequency: 'As directed',
            duration: 'As prescribed',
            confidence: 0.7
          });
        }
      }
    }

    return {
      extractedMedicines: medicines,
      patientInfo: {},
      doctorInfo: {},
      confidence: 0.7,
      rawAnalysis: analysis
    };
  }

  // Combined AI analysis using multiple providers
  static async analyzeWithMultipleAI(extractedText: string): Promise<AIAnalysisResult> {
    const results: AIAnalysisResult[] = [];
    
    // Try Google AI first
    try {
      const googleResult = await this.analyzeWithGoogleAI(extractedText);
      if (googleResult.confidence > 0) {
        results.push(googleResult);
      }
    } catch (error) {
      console.warn('Google AI failed:', error);
    }
    
    // Try Groq as backup
    try {
      const groqResult = await this.analyzeWithGroq(extractedText);
      if (groqResult.confidence > 0) {
        results.push(groqResult);
      }
    } catch (error) {
      console.warn('Groq failed:', error);
    }
    
    // Return best result or fallback
    if (results.length > 0) {
      return results.reduce((best, current) => 
        current.confidence > best.confidence ? current : best
      );
    }
    
    console.info('All AI services unavailable, using advanced pattern matching');
    return this.fallbackParsing(extractedText, 'All AI services failed');
  }
}