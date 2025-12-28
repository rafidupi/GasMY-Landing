import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export function Card({ children, className, gradient = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-ios-lg p-6 shadow-sm overflow-hidden',
        gradient
          ? 'bg-gradient-to-br from-grad-start to-grad-end text-white'
          : 'bg-bg-card border border-border-subtle',
        className
      )}
    >
      {children}
    </div>
  );
}
