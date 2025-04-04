import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import MedicalCare from '../../../assets/Medical-care-cuate.svg';

const PasswordUpdated: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Image */}
      <div className="hidden w-1/2 bg-[#FFFFFF] lg:flex lg:flex-col p-8">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={MedicalCare}
            alt="Medical care illustration"
            className="w-full max-w-lg"
          />
        </div>
      </div>

      {/* Right Section - Success Message */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-6">
            {/* Checkmark Icon */}
            <div className="flex justify-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100">
                <FaCheckCircle className="h-10 w-10 text-teal-600" />
              </div>
            </div>

            {/* Success Text */}
            <h1 className="text-3xl font-semibold text-gray-900">
              Password Updated!
            </h1>
            <p className="text-gray-600">
              Your password has been successfully updated. Please login with
              your new password.
            </p>

            {/* Back to Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="w-full rounded-md bg-teal-500 py-2 px-4 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Back to Login
            </button>

            {/* Additional Help Text */}
            <p className="text-sm text-gray-600">
              Having issues? Contact our{' '}
              <Link
                to="/support"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdated;
