import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-ios transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed will-change-transform';
  
  const variants = {
    primary: 'bg-gradient-to-br from-[#0066ff] to-[#0052cc] text-white hover:from-[#0052cc] hover:to-[#0044aa] shadow-[0_6px_20px_rgba(0,102,255,0.5)] hover:shadow-[0_8px_28px_rgba(0,102,255,0.65)] hover:translate-y-[-2px] active:translate-y-[0px]',
    secondary: 'bg-success text-white hover:opacity-90 shadow-md hover:shadow-lg',
    outline: 'border-2 border-border-main text-text-strong hover:border-primary hover:text-primary bg-bg-card',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
