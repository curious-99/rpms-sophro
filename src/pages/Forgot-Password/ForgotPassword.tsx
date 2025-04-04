import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import MedicalCare from '../../assets/Medical-care-cuate.svg';
import { AuthService } from '../../services/api/auth.service';

type ForgetPasswordStep = 'contact' | 'otp';

type ForgotPasswordFormData = {
  userPhone: string;
};

export const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ForgetPasswordStep>('contact');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: any) => {
    if (step === 'contact') {
      // Handle contact submission
      setStep('otp');
    } else {
      // Handle OTP verification
      navigate('/forgot-password/update-password');
    }
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput =
        element.parentElement?.nextElementSibling?.querySelector('input');
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.target as HTMLInputElement;

    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      if (index > 0) {
        const prevInput =
          target.parentElement?.previousElementSibling?.querySelector('input');
        prevInput?.focus();
      }
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput =
        target.parentElement?.previousElementSibling?.querySelector('input');
      prevInput?.focus();
    }

    if (e.key === 'ArrowRight' && index < 5) {
      const nextInput =
        target.parentElement?.nextElementSibling?.querySelector('input');
      nextInput?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    if (!/^\d+$/.test(pastedData)) return;

    const pastedArray = pastedData.split('').slice(0, 6);
    const newOtp = [...otp];

    pastedArray.forEach((value, index) => {
      if (index < 6) newOtp[index] = value;
    });

    setOtp(newOtp);

    const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
    const nextEmptyIndex = newOtp.findIndex((val) => !val);

    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputs[nextEmptyIndex].focus();
    } else {
      inputs[5].focus();
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Left Section with Image */}
      <div className="hidden w-1/2 bg-[#FFFFFF] dark:bg-gray-900 lg:flex lg:flex-col p-8">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={MedicalCare}
            alt="Medical care illustration"
            className="w-full max-w-lg"
          />
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">
              {step === 'contact' ? 'Forgot Password?' : 'OTP Verification'}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 'contact' ? (
                <div className="space-y-2">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Enter Mobile Number/Email Address
                  </label>
                  <input
                    {...register('contact', {
                      required: 'Email or phone number is required',
                      validate: (value) => {
                        const emailRegex =
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        if (emailRegex.test(value)) return true;

                        const digitsOnly = value.replace(/\D/g, '');
                        if (digitsOnly.length >= 10 && digitsOnly.length <= 15)
                          return true;

                        return 'Please enter a valid email or phone number';
                      },
                    })}
                    type="text"
                    placeholder="example@mail.com or 1234567890"
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                  />
                  {errors.contact && (
                    <p className="text-sm text-red-600">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please enter the OTP sent to your registered contact.
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
                            ${digit ? 'border-teal-500' : 'border-gray-300 dark:border-gray-600'}
                            dark:bg-gray-700 dark:text-white
                          `}
                          maxLength={1}
                          ref={(input) => {
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
                      className="text-sm text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                      onClick={() => console.log('Resend OTP')}
                    >
                      Resend OTP
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {otp.filter(Boolean).length}/6 digits entered
                    </span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-teal-500 py-2 px-4 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {isSubmitting
                  ? 'Processing...'
                  : step === 'contact'
                    ? 'Send OTP'
                    : 'Verify OTP'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {step === 'contact' ? (
                <>
                  Remember your password?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    Login
                  </Link>
                </>
              ) : (
                "Didn't receive the code? Check your spam folder or request a new code"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
