// src/components/form/TextField.tsx
import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helpText,
  required,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-950">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={`w-full px-4 py-2 bg-white border rounded-lg 
          placeholder-gray-400 focus:outline-none focus:ring-2 
          focus:ring-blue-500 transition-colors
          ${error ? 'border-red-500' : 'border-gray-600'} 
          ${className}`}
        {...props}
      />
      {helpText && <p className="text-sm text-gray-400">{helpText}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};