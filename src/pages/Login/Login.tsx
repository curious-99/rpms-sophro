import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/api/auth.service';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import MedicalCare from '../../assets/Medical-care-cuate.svg';
import GoogleLogo from '../../assets/google.svg';

type LoginFormData = {
  userId: string;
  password: string;
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await AuthService.login(data);

      // Handle successful login
      localStorage.setItem('authToken', response.token);
      navigate('/dashboard');
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Invalid credentials. Please try again.',
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Left Section */}
      <div className="hidden w-1/2 bg-[#FFFFFF] dark:bg-gray-900 lg:flex lg:flex-col p-8">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={MedicalCare}
            alt="Medical care illustration"
            className="w-full max-w-lg"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User ID Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Mobile Number/Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  {...register('userId', {
                    required: 'Email or phone number is required',
                    validate: (value) => {
                      const emailRegex =
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                      const digitsOnly = value.replace(/\D/g, '');
                      if (
                        emailRegex.test(value) ||
                        (digitsOnly.length >= 10 && digitsOnly.length <= 15)
                      )
                        return true;
                      return 'Please enter a valid email or phone number';
                    },
                  })}
                  type="text"
                  placeholder="example@mail.com or 1234567890"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              {errors.userId && (
                <p className="text-sm text-red-600">{errors.userId.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>

            <div className="flex justify-between text-sm">
              <Link
                to="/login-otp"
                className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Login via OTP
              </Link>
              <Link
                to="/forgot-password"
                className="text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Social Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                OR
              </span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <img src={GoogleLogo} alt="Google logo" className="h-5 w-5" />
            <span className="text-gray-700 dark:text-gray-300">
              Login with Google
            </span>
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
