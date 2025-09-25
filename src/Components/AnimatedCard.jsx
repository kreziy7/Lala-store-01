// src/components/AnimatedCard.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AnimatedCard = ({ children, className = '', hover3D = false, glowEffect = false, ...props }) => {
  const { theme, isAnimated } = useTheme();
  const baseClasses = `${theme.surface} rounded-2xl ${theme.shadow} ${theme.border} border`;
 
  const animationClasses = isAnimated ? [
    'transition-all duration-300',
    hover3D ? 'hover:transform hover:-translate-y-2 hover:rotate-1' : 'hover:scale-105',
    glowEffect ? theme.glowEffect : theme.cardHover,
    'hover:z-10 relative'
  ].join(' ') : '';
  return (
    <div
      className={`${baseClasses} ${animationClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;