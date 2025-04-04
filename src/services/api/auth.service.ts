import api from '../axios';

export const AuthService = {
  async login(credentials: { userId: string; password: string }) {
    try {
      const response = await api.put(
        '/api/v1/auth-svc/sophro-users/signin-command',
        credentials
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async generateOtp(userId: string, type: number) {
    try {
      const response = await api.put(
        '/api/v1/auth-svc/sophro-users/generateotp-command',
        { userId, type }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async signInWithOtp(userId: string, otp: string) {
    try {
      const response = await api.post(
        '/api/v1/auth-svc/sophro-users/signinotp-command',
        { userId, otp }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async forgotPassword(userEmail: string) {
    try {
      const response = await api.put(
        '/api/v1/auth-svc/sophro-users/forgotpassword-command',
        { userEmail }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
