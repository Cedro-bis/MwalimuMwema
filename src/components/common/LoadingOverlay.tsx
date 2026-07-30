import React from 'react';
import { motion } from 'motion/react';

export interface LoadingOverlayProps {
  loading: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="w-16 h-16 border-[3px] border-black/5 border-t-black rounded-full animate-spin" />
      </motion.div>
    </div>
  );
};
