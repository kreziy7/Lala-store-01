// src/components/ThemeSelector.jsx
import React, { useState } from 'react';
import { Palette, Settings, Sparkles, Moon, Sun, Zap, Waves } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme, isAnimated, toggleAnimations } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const themeIcons = {
    light: Sun,
    dark: Moon,
    violet: Palette,
    neon: Zap,
    ocean: Waves,
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full ${themes[currentTheme].primary} ${themes[currentTheme].text} ${themes[currentTheme].shadow} ${isAnimated ? 'transition-all duration-300 hover:scale-110' : ''} ${themes[currentTheme].glowEffect}`}
      >
        <Settings className={`h-6 w-6 ${isAnimated ? 'animate-spin-slow' : ''}`} />
      </button>
      {isOpen && (
        <div
          className={`absolute top-16 right-0 ${themes[currentTheme].surface} rounded-2xl ${themes[currentTheme].shadow} p-6 w-80 ${themes[currentTheme].border} border ${isAnimated ? 'animate-fade-in' : ''}`}
        >
          <h3 className={`text-lg font-bold mb-4 ${themes[currentTheme].text}`}>Theme Settings</h3>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`font-medium ${themes[currentTheme].text}`}>Animations</span>
              <button
                onClick={toggleAnimations}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnimated ? themes[currentTheme].primary : themes[currentTheme].secondary}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnimated ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className={`font-medium ${themes[currentTheme].textSecondary} mb-3`}>Choose Theme</h4>
            {Object.entries(themes).map(([key, theme]) => {
              const IconComponent = themeIcons[key];
              return (
                <button
                  key={key}
                  onClick={() => changeTheme(key)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    currentTheme === key
                      ? `${theme.primary} ${themes[currentTheme].text}`
                      : `${themes[currentTheme].secondary} ${themes[currentTheme].textSecondary} hover:${theme.primary} hover:${themes[currentTheme].text}`
                  } ${isAnimated ? 'hover:scale-105' : ''}`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{theme.name}</span>
                  {currentTheme === key && <Sparkles className="h-4 w-4 ml-auto" />}
                </button>
              );
            })}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <div
              className={`w-full h-20 rounded-lg ${themes[currentTheme].gradient} flex items-center justify-center ${isAnimated ? 'animate-pulse' : ''}`}
            >
              <span className="text-white font-bold">Preview</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;