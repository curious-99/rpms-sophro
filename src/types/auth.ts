export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  phone: string;
  countryCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string[];
}

export type SignUpStep = 'phone' | 'otp';

export type UserRole = 'DOCTOR' | 'PATIENT' | 'CARETAKER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  // Add other user fields as needed
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
