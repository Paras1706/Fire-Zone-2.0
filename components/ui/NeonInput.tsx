import React from 'react';

interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const NeonInput: React.FC<NeonInputProps> = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-neon-blue text-sm font-bold mb-2 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-gray-900 text-white border-2 
            ${error ? 'border-red-500' : 'border-gray-700 focus:border-neon-blue'} 
            rounded-md py-3 ${icon ? 'pl-10' : 'pl-3'} pr-3 
            outline-none transition-colors duration-300
            placeholder-gray-600
          `}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
