import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import type { SignUpFormData } from '../types/auth';

// Steps configuration
const SIGNUP_STEPS = [
  { title: 'Personal Information', progress: 20 },
  { title: 'Contact Details', progress: 40 },
  { title: 'Security Setup', progress: 60 },
  { title: 'Preferences', progress: 80 },
  { title: 'Verification', progress: 90 },
  { title: 'Complete Profile', progress: 100 },
];

export const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormData>({ mode: 'onChange' });

  const password = watch('password');

  const handleNext = async () => {
    // Validate current step before proceeding
    const isValid = await trigger();
    if (isValid)
      setCurrentStep((prev) => Math.min(prev + 1, SIGNUP_STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: SignUpFormData) => {
    // Final submission logic
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8 px-4">
          <div className="flex items-center justify-between">
            {SIGNUP_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center w-full"
              >
                <div
                  className={`h-2 w-full ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}
                />
                <span
                  className={`text-sm mt-2 ${index === currentStep ? 'font-medium text-blue-600' : 'text-gray-500'}`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <>
                <Input
                  label="Full Name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  error={errors.name?.message}
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  {...register('dob', {
                    required: 'Date of birth is required',
                  })}
                  error={errors.dob?.message}
                />
              </>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 1 && (
              <>
                <Input
                  label="Email address"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={errors.email?.message}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value:
                        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                      message: 'Invalid phone number',
                    },
                  })}
                  error={errors.phone?.message}
                />
              </>
            )}

            {/* Step 3: Security Setup */}
            {currentStep === 2 && (
              <>
                <Input
                  label="Password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  error={errors.password?.message}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'The passwords do not match',
                  })}
                  error={errors.confirmPassword?.message}
                />
              </>
            )}

            {/* Add more steps as needed */}

            {/* Navigation Controls */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                startIcon={<ArrowLeft className="h-4 w-4" />}
              >
                Back
              </Button>

              {currentStep < SIGNUP_STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  endIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" isLoading={isSubmitting}>
                  Create Account
                </Button>
              )}
            </div>
          </form>

          {/* Already have account */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
