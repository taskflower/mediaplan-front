// src/components/form/Checkbox.tsx
interface CheckboxFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className={`mt-1 checkbox border-black ${className}`}
          {...props}
        />
        <span className="text-sm mt-1.5 ">{label}</span>
      </label>
      {error && <p className="text-sm text-red-500 ml-8">{error}</p>}
    </div>
  );
};
