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
      <label className="block text-sm font-medium text-gray-950">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        className={`w-full px-4 py-2 bg-white border rounded-lg 
          placeholder-gray-400 focus:outline-none focus:ring-2 
          focus:ring-blue-500 transition-colors
          ${error ? 'border-red-500' : 'border-gray-600'} 
          ${className}`}
        style={{
          appearance: 'none', // Ukrywa domyślny wygląd selecta
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center', // Odsunięcie strzałki od prawej krawędzi
          backgroundSize: '1rem',
          paddingRight: '2.5rem', // Dodanie miejsca na strzałkę
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && <p className="text-sm text-gray-400">{helpText}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
