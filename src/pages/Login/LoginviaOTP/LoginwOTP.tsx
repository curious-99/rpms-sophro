import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthService } from '../../../services/api/auth.service';
import MedicalCare from '../../../assets/Medical-care-cuate.svg';

type LoginviaOTPFormData = {
  userId: string;
  countryCode?: string;
};

export const LoginviaOTP: React.FC = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [inputType, setInputType] = useState<'email' | 'phone'>('email');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
    setValue,
    trigger,
  } = useForm<LoginviaOTPFormData>();

  const userIdValue = watch('userId');

  useEffect(() => {
    if (userIdValue) {
      const firstChar = userIdValue[0];
      const isNumber = /\d/.test(firstChar);
      setInputType(isNumber ? 'phone' : 'email');

      if (!isNumber) {
        setValue('countryCode', undefined);
        trigger('countryCode');
      }
    }
  }, [userIdValue, setValue, trigger]);

  const onSubmit = async (data: LoginviaOTPFormData) => {
    if (step === 'phone') {
      try {
        const contact =
          inputType === 'phone' && data.countryCode
            ? `${data.countryCode}${data.userId}`
            : data.userId;

        // Set type to 1 for phone, 2 for email
        const contactType = inputType === 'phone' ? 1 : 2;

        await AuthService.generateOtp(contact, contactType);
        setStep('otp');
      } catch (error) {
        setError('userId', {
          type: 'manual',
          message: 'Failed to generate OTP. Please try again.',
        });
      }
    } else {
      const otpCode = otp.join('');
      try {
        const response = await AuthService.signInWithOtp(
          inputType === 'phone'
            ? `${watch('countryCode')}${watch('userId')}`
            : watch('userId'),
          otpCode
        );
        localStorage.setItem('authToken', response.token);
        navigate('/dashboard');
      } catch (error) {
        setError('otp', {
          type: 'manual',
          message: 'Invalid OTP. Please try again.',
        });
      }
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
      {/* Left Section with Illustration */}
      <div className="hidden w-1/2 bg-[#FFFFFF] dark:bg-gray-900 lg:flex lg:flex-col p-8">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={MedicalCare}
            alt="Medical care illustration"
            className="w-full max-w-lg"
          />
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
              {step === 'phone' ? 'Login with OTP' : 'OTP Verification'}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === 'phone' ? (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enter Mobile Number/Email Address
                  </label>
                  <div className="flex gap-2">
                    {inputType === 'phone' && (
                      <select
                        {...register('countryCode')}
                        className="block w-[100px] rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                      </select>
                    )}
                    <input
                      {...register('userId', {
                        required: 'This field is required',
                        validate: (value) => {
                          if (inputType === 'phone') {
                            if (!/^\d{10}$/.test(value))
                              return 'Invalid phone number';
                          } else {
                            if (
                              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                value
                              )
                            ) {
                              return 'Invalid email address';
                            }
                          }
                          return true;
                        },
                      })}
                      type={inputType === 'phone' ? 'tel' : 'email'}
                      placeholder={
                        inputType === 'phone'
                          ? '1234567890'
                          : 'example@mail.com'
                      }
                      className="block flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  {errors.userId && (
                    <p className="text-sm text-red-600">
                      {errors.userId.message}
                    </p>
                  )}
                  {errors.countryCode && (
                    <p className="text-sm text-red-600">
                      {errors.countryCode.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please enter the OTP sent to your{' '}
                    {inputType === 'phone' ? 'phone' : 'email'}
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
                  {errors.otp && (
                    <p className="text-sm text-red-600">{errors.otp.message}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-teal-500 py-2 px-4 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {isSubmitting
                  ? 'Processing...'
                  : step === 'phone'
                    ? 'Send OTP'
                    : 'Verify OTP'}
              </button>
            </form>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
