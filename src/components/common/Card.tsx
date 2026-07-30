import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, padding = true }) => (
  <div className={cn("bg-white border border-black rounded-[3rem] overflow-hidden", padding && "p-10", className)}>
    {children}
  </div>
);
