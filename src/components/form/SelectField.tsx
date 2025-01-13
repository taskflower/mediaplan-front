import React from 'react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  helpText?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  error,
  helpText,
  required,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {/* Etykieta */}
      <label className="block text-sm font-medium text-gray-950">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Select */}
      <div className="relative">
        <select
          className={`w-full px-4 py-2 bg-white text-gray-900 border rounded-lg 
            placeholder-gray-400 focus:outline-none focus:ring-2 
            focus:ring-blue-500 transition-colors appearance-none
            ${error ? 'border-red-500' : 'border-gray-600'} 
            ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>

        {/* Strzałka */}
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        >
          <svg
            className="w-4 h-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Pomocniczy tekst */}
      {helpText && <p className="text-sm text-gray-400">{helpText}</p>}

      {/* Komunikat o błędzie */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
