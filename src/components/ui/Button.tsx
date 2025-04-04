import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  size?: 'default' | 'icon';
}

const baseStyles =
  'flex flex-row justify-center items-center gap-[10px] self-stretch w-full px-4 py-1.5 rounded-[9px] transition-colors duration-200';

const variants = {
  primary: 'bg-[#40D0B9] text-white font-semibold hover:bg-opacity-90',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  outline: 'border border-gray-800 text-gray-800 hover:bg-gray-100',
  ghost: 'bg-transparent hover:bg-gray-100',
};

export const buttonVariants = ({
  variant,
  size,
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'icon';
}) => {
  let sizeClasses = '';
  if (size === 'icon') {
    sizeClasses = 'p-2';
  }
  return cn(baseStyles, variants[variant ?? 'primary'], sizeClasses);
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  size = 'default',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
