import React from 'react';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const NeonCard: React.FC<NeonCardProps> = ({ children, className = '', glow = false }) => {
  return (
    <div className={`
      bg-neon-surface 
      border border-gray-800 
      rounded-lg 
      p-6 
      backdrop-blur-sm 
      bg-opacity-80
      ${glow ? 'shadow-[0_0_15px_rgba(188,19,254,0.15)] border-neon-purple/30' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};
