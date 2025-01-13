// src/components/form/TextArea.tsx
interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    helpText?: string;
  }
  
  export const TextAreaField: React.FC<TextAreaFieldProps> = ({
    label,
    error,
    helpText,
    required,
    className = '',
    ...props
  }) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg 
            placeholder-gray-400 focus:outline-none focus:ring-2 
            focus:ring-blue-500 transition-colors resize-none
            ${error ? 'border-red-500' : 'border-gray-600'}
            ${className}`}
          {...props}
        />
        {helpText && <p className="text-sm text-gray-400">{helpText}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  };