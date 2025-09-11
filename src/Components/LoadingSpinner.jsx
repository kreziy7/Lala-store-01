// src/components/LoadingSpinner.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const { theme, isAnimated } = useTheme();
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} border-4 ${theme.border} border-t-transparent rounded-full ${isAnimated ? 'animate-spin' : ''}`}></div>
      {text && (
        <p className={`${theme.textSecondary} text-sm font-medium`}>{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;