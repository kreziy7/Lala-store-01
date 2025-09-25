// src/context/ThemeContext.jsx (No changes needed)
import React, { createContext, useContext, useState, useEffect } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'Light',
    primary: 'bg-[var(--primary)]',
    primaryHover: 'hover:bg-[var(--primary-hover)]',
    secondary: 'bg-[var(--secondary)]',
    background: 'bg-[var(--background)]',
    surface: 'bg-[var(--surface)]',
    text: 'text-[var(--text)]',
    textSecondary: 'text-[var(--text-secondary)]',
    border: 'border-[var(--border)]',
    accent: 'text-[var(--accent)]',
    gradient: 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]',
    shadow: 'shadow-[var(--shadow)]',
    cardHover: 'hover:shadow-[var(--card-hover-shadow)] hover:scale-105',
    glowEffect: 'hover:shadow-[var(--glow)] hover:shadow-2xl',
    cssVars: {
      '--primary': '#fbbf24',
      '--primary-hover': '#eab308',
      '--secondary': '#f3f4f6',
      '--background': '#f9fafb',
      '--surface': '#ffffff',
      '--text': '#111827',
      '--text-secondary': '#6b7280',
      '--border': '#e5e7eb',
      '--accent': '#eab308',
      '--gradient-start': '#fbbf24',
      '--gradient-end': '#fb923c',
      '--shadow': '0 4px 6px -1px rgba(0,0,0,0.1)',
      '--card-hover-shadow': '0 10px 15px -3px rgba(0,0,0,0.1)',
      '--glow': '0 0 8px rgba(234,179,8,0.25)',
    },
  },
  dark: {
    name: 'Dark',
    primary: 'bg-[var(--primary)]',
    primaryHover: 'hover:bg-[var(--primary-hover)]',
    secondary: 'bg-[var(--secondary)]',
    background: 'bg-[var(--background)]',
    surface: 'bg-[var(--surface)]',
    text: 'text-[var(--text)]',
    textSecondary: 'text-[var(--text-secondary)]',
    border: 'border-[var(--border)]',
    accent: 'text-[var(--accent)]',
    gradient: 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]',
    shadow: 'shadow-[var(--shadow)]',
    cardHover: 'hover:shadow-[var(--card-hover-shadow)] hover:scale-105',
    glowEffect: 'hover:shadow-[var(--glow)] hover:shadow-2xl',
    cssVars: {
      '--primary': '#9333ea',
      '--primary-hover': '#7e22ce',
      '--secondary': '#1f2937',
      '--background': '#111827',
      '--surface': '#1f2937',
      '--text': '#ffffff',
      '--text-secondary': '#d1d5db',
      '--border': '#374151',
      '--accent': '#c084fc',
      '--gradient-start': '#9333ea',
      '--gradient-end': '#db2777',
      '--shadow': '0 4px 6px -1px rgba(0,0,0,0.2)',
      '--card-hover-shadow': '0 10px 15px -3px rgba(0,0,0,0.3)',
      '--glow': '0 0 8px rgba(168,85,247,0.5)',
    },
  },
  violet: {
    name: 'Dark Violet',
    primary: 'bg-[var(--primary)]',
    primaryHover: 'hover:bg-[var(--primary-hover)]',
    secondary: 'bg-[var(--secondary)]',
    background: 'bg-[var(--background)]',
    surface: 'bg-[var(--surface)]',
    text: 'text-[var(--text)]',
    textSecondary: 'text-[var(--text-secondary)]',
    border: 'border-[var(--border)]',
    accent: 'text-[var(--accent)]',
    gradient: 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]',
    shadow: 'shadow-[var(--shadow)]',
    cardHover: 'hover:shadow-[var(--card-hover-shadow)] hover:scale-105',
    glowEffect: 'hover:shadow-[var(--glow)] hover:shadow-2xl',
    cssVars: {
      '--primary': '#7c3aed',
      '--primary-hover': '#6d28d9',
      '--secondary': '#1e293b',
      '--background': '#0f172a',
      '--surface': '#1e293b',
      '--text': '#ffffff',
      '--text-secondary': '#cbd5e1',
      '--border': '#334155',
      '--accent': '#a78bfa',
      '--gradient-start': '#7c3aed',
      '--gradient-end': '#6366f1',
      '--shadow': '0 4px 6px -1px rgba(0,0,0,0.2)',
      '--card-hover-shadow': '0 10px 15px -3px rgba(0,0,0,0.3)',
      '--glow': '0 0 8px rgba(124,58,237,0.6)',
    },
  },
  neon: {
    name: 'Neon',
    primary: 'bg-[var(--primary)]',
    primaryHover: 'hover:bg-[var(--primary-hover)]',
    secondary: 'bg-[var(--secondary)]',
    background: 'bg-[var(--background)]',
    surface: 'bg-[var(--surface)]',
    text: 'text-[var(--text)]',
    textSecondary: 'text-[var(--text-secondary)]',
    border: 'border-[var(--border)]',
    accent: 'text-[var(--accent)]',
    gradient: 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]',
    shadow: 'shadow-[var(--shadow)]',
    cardHover: 'hover:shadow-[var(--card-hover-shadow)] hover:scale-105',
    glowEffect: 'hover:shadow-[var(--glow)] hover:shadow-2xl',
    cssVars: {
      '--primary': '#06b6d4',
      '--primary-hover': '#0891b2',
      '--secondary': '#111827',
      '--background': '#000000',
      '--surface': '#111827',
      '--text': '#cffafe',
      '--text-secondary': '#67e8f9',
      '--border': '#06b6d4',
      '--accent': '#22d3ee',
      '--gradient-start': '#06b6d4',
      '--gradient-end': '#3b82f6',
      '--shadow': '0 4px 6px -1px rgba(0,0,0,0.2)',
      '--card-hover-shadow': '0 10px 15px -3px rgba(0,0,0,0.3)',
      '--glow': '0 0 8px rgba(6,182,212,0.7)',
    },
  },
  ocean: {
    name: 'Ocean',
    primary: 'bg-[var(--primary)]',
    primaryHover: 'hover:bg-[var(--primary-hover)]',
    secondary: 'bg-[var(--secondary)]',
    background: 'bg-[var(--background)]',
    surface: 'bg-[var(--surface)]',
    text: 'text-[var(--text)]',
    textSecondary: 'text-[var(--text-secondary)]',
    border: 'border-[var(--border)]',
    accent: 'text-[var(--accent)]',
    gradient: 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]',
    shadow: 'shadow-[var(--shadow)]',
    cardHover: 'hover:shadow-[var(--card-hover-shadow)] hover:scale-105',
    glowEffect: 'hover:shadow-[var(--glow)] hover:shadow-2xl',
    cssVars: {
      '--primary': '#2563eb',
      '--primary-hover': '#1d4ed8',
      '--secondary': '#f1f5f9',
      '--background': 'linear-gradient(to bottom right, #f0f9ff, #e0e7ff)',
      '--surface': '#ffffff',
      '--text': '#0f172a',
      '--text-secondary': '#475569',
      '--border': '#bfdbfe',
      '--accent': '#2563eb',
      '--gradient-start': '#2563eb',
      '--gradient-end': '#4f46e5',
      '--shadow': '0 4px 6px -1px rgba(59,130,246,0.2)',
      '--card-hover-shadow': '0 10px 15px -3px rgba(59,130,246,0.3)',
      '--glow': '0 0 8px rgba(37,99,235,0.4)',
    },
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('lalastore_theme');
    const savedAnimation = localStorage.getItem('lalastore_animations');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    if (savedAnimation !== null) {
      setIsAnimated(JSON.parse(savedAnimation));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lalastore_theme', currentTheme);
    localStorage.setItem('lalastore_animations', JSON.stringify(isAnimated));

    const root = document.documentElement;
    Object.entries(themes[currentTheme].cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    document.body.style.background = themes[currentTheme].cssVars['--background'];
    document.body.style.color = themes[currentTheme].cssVars['--text'];
    document.body.classList.add('transition-all', 'duration-500');
  }, [currentTheme, isAnimated]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleAnimations = () => {
    const newValue = !isAnimated;
    setIsAnimated(newValue);
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme,
    isAnimated,
    toggleAnimations,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};