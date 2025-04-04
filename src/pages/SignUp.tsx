import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import type { SignUpFormData, SignUpStep } from '../types/auth';
import OtpVerification from '../assets/OtpVerification.svg';
import MedicalCare from '../assets/Medical-care-cuate.svg';

export const SignUp: React.FC = () => {
  const [step, setStep] = useState<SignUpStep>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    if (step === 'phone') {
      // Handle phone verification
      setStep('otp');
    } else if (step === 'otp') {
      // Handle OTP verification
      setStep('details');
    } else {
      // Handle final submission
      console.log('Final submission:', data);
    }
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      const nextInput =
        element.parentElement?.nextElementSibling?.querySelector('input');
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.target as HTMLInputElement;

    // Handle backspace
    if (e.key === 'Backspace') {
      e.preventDefault();

      // Clear current input
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      // Move to previous input
      if (index > 0) {
        const prevInput =
          target.parentElement?.previousElementSibling?.querySelector('input');
        if (prevInput) {
          prevInput.focus();
        }
      }
    }

    // Handle left arrow
    if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput =
        target.parentElement?.previousElementSibling?.querySelector('input');
      if (prevInput) prevInput.focus();
    }

    // Handle right arrow
    if (e.key === 'ArrowRight' && index < 5) {
      const nextInput =
        target.parentElement?.nextElementSibling?.querySelector('input');
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // Check if pasted data contains only numbers
    if (!/^\d+$/.test(pastedData)) return;

    const pastedArray = pastedData.split('').slice(0, 6);
    const newOtp = [...otp];

    pastedArray.forEach((value, index) => {
      if (index < 6) newOtp[index] = value;
    });

    setOtp(newOtp);

    // Focus the next empty input or the last input
    const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
    const nextEmptyIndex = newOtp.findIndex((val) => !val);

    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputs[nextEmptyIndex].focus();
    } else {
      inputs[5].focus();
    }
  };

  const stepImages: Record<SignUpStep, { src: string; alt: string }> = {
    phone: {
      src: MedicalCare,
      alt: 'Phone verification illustration',
    },
    otp: {
      src: OtpVerification,
      alt: 'OTP verification illustration',
    },
    details: {
      src: MedicalCare,
      alt: 'Profile details illustration',
    },
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Step-specific Illustration */}
      <div className="hidden w-1/2 bg-[#F5F5F5] lg:flex lg:items-center lg:justify-center p-8">
        <div className="relative w-full max-w-lg">
          <img
            src={stepImages[step].src}
            alt={stepImages[step].alt}
            width="600"
            height="600"
            className="w-full"
          />
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/logo.svg"
              alt="Logo"
              width="64"
              height="64"
              className="h-16 w-16"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 text-center">
              {step === 'phone' && 'Setup Your Account'}
              {step === 'otp' && 'OTP Verification'}
              {step === 'details' && 'Complete Your Profile'}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 'phone' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      {...register('countryCode')}
                      className="block w-[100px] rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit phone number',
                        },
                      })}
                      type="tel"
                      placeholder="XXX XXX XXXX"
                      className="block flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              )}

              {step === 'otp' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Please enter the OTP to complete the phone number
                    verification.
                  </p>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <div key={index} className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          autoComplete="one-time-code"
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target, index)}
                          onKeyDown={(e) => handleOtpKeyDown(e, index)}
                          onPaste={handleOtpPaste}
                          className={`
                            otp-input h-12 w-12 rounded-md border text-center text-lg shadow-sm
                            focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500
                            ${digit ? 'border-teal-500' : 'border-gray-300'}
                          `}
                          maxLength={1}
                          ref={(input) => {
                            // Auto focus first input on mount
                            if (input && index === 0 && otp.every((v) => !v)) {
                              input.focus();
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="text-sm text-teal-600 hover:text-teal-500"
                      onClick={() => console.log('Resend OTP')}
                    >
                      Resend OTP
                    </button>
                    <span className="text-sm text-gray-500">
                      {otp.filter(Boolean).length}/6 digits entered
                    </span>
                  </div>
                </div>
              )}

              {step === 'details' && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      placeholder="xyz@example.com"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                          },
                        })}
                        type={showPassword ? 'text' : 'password'}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) =>
                            value === watch('password') ||
                            'The passwords do not match',
                        })}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-teal-500 py-2 px-4 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Processing...' : 'Continue'}
              </button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Login now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
