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
