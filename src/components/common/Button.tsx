import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  disabled = false,
  loading = false,
  type = 'button'
}) => {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 transition-all duration-300",
    secondary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100",
    outline: "bg-white border-2 border-black text-black hover:bg-black hover:text-white",
    dark: "bg-zinc-950 text-white hover:bg-black shadow-lg"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "px-10 py-5 rounded-full font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-base tracking-tight cursor-pointer",
        variants[variant],
        className
      )}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};
