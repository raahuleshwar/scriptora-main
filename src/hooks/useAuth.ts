import { useState, useEffect } from 'react';
import { User } from '../types';

// Demo users for authentication
const demoUsers: User[] = [
  {
    id: '1',
    email: 'admin@hospital.com',
    full_name: 'Administrator',
    role: 'admin',
    phone: '+1-234-567-8900',
    created_at: '2024-01-01T00:00:00Z',
    is_active: true,
    permissions: ['all'],
  },
  {
    id: '2',
    email: 'doctor@hospital.com',
    full_name: 'Dr. Sarah Johnson',
    role: 'doctor',
    phone: '+1-234-567-8901',
    created_at: '2024-01-01T00:00:00Z',
    is_active: true,
  },
  {
    id: '3',
    email: 'patient@hospital.com',
    full_name: 'John Smith',
    role: 'patient',
    phone: '+1-234-567-8902',
    created_at: '2024-01-01T00:00:00Z',
    is_active: true,
  },
  {
    id: '4',
    email: 'medical@hospital.com',
    full_name: 'Medical Staff',
    role: 'medical',
    phone: '+1-234-567-8903',
    created_at: '2024-01-01T00:00:00Z',
    is_active: true,
  },
  {
    id: '5',
    email: 'ocr@hospital.com',
    full_name: 'OCR Specialist',
    role: 'ocr',
    phone: '+1-234-567-8904',
    created_at: '2024-01-01T00:00:00Z',
    is_active: true,
  },
];

const demoPasswords: { [key: string]: string } = {
  'admin@hospital.com': 'admin123',
  'doctor@hospital.com': 'doctor123',
  'patient@hospital.com': 'patient123',
  'medical@hospital.com': 'medical123',
  'ocr@hospital.com': 'ocr123',
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('hospital_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = demoUsers.find(u => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'User not found' };
    }

    if (demoPasswords[email] !== password) {
      setIsLoading(false);
      return { success: false, error: 'Invalid password' };
    }

    if (!foundUser.is_active) {
      setIsLoading(false);
      return { success: false, error: 'Account is disabled' };
    }

    setUser(foundUser);
    localStorage.setItem('hospital_user', JSON.stringify(foundUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospital_user');
  };

  return {
    user,
    login,
    logout,
    isLoading,
  };
};