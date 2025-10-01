export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'doctor' | 'patient' | 'medical' | 'ocr';
  phone?: string;
  created_at: string;
  is_active: boolean;
  permissions?: string[];
}

export interface Doctor extends User {
  specialty: string;
  license_number: string;
  years_experience: number;
  consultation_fee: number;
  available_hours: {
    start: string;
    end: string;
  };
}

export interface Patient extends User {
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  blood_group?: string;
  emergency_contact?: string;
  medical_history?: string[];
  allergies?: string[];
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  token_number: number;
  created_at: string;
}

export interface Medicine {
  id: string;
  name: string;
  generic_name?: string;
  manufacturer: string;
  dosage: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops';
  quantity_in_stock: number;
  unit_price: number;
  expiry_date: string;
  batch_number: string;
  minimum_stock_level: number;
}

export interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_id?: string;
  medicines: PrescribedMedicine[];
  diagnosis: string;
  notes?: string;
  created_at: string;
}

export interface PrescribedMedicine {
  medicine_id: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface OCRResult {
  id: string;
  prescription_text: string;
  extracted_medicines: ExtractedMedicine[];
  confidence_score: number;
  processed_at: string;
  processed_by: string;
}

export interface ExtractedMedicine {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  confidence: number;
}