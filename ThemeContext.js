// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const colors = {
    light: {
      primary: '#047cac',
      secondary: '#72d4f5',
      tertiary: '#045c84',
      quaternary: '#639fb0',
      quinary: '#9ad2a9',
      background: '#F5F5F5',
      text: '#000000',
      cardBackground: '#FFFFFF',
    },
    dark: {
      primary: '#047cac',
      secondary: '#72d4f5',
      tertiary: '#045c84',
      quaternary: '#639fb0',
      quinary: '#9ad2a9',
      background: '#121212',
      text: '#FFFFFF',
      cardBackground: '#1E1E1E',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: colors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);