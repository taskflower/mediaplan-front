interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
  }
  
  export const Button: React.FC<ButtonProps> = ({ 
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
  }) => {
    const baseClasses = 'rounded font-medium transition-colors'
    
    const variantClasses = {
      primary: 'bg-gray-50 hover:bg-gray-300 text-gray-900 border border-gray-600',
      secondary: 'bg-gray-900 hover:bg-gray-600 text-white',
      danger: 'bg-red-500 hover:bg-red-600 text-white'
    }
  
    const sizeClasses = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    }
  
    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }