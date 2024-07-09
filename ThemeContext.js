// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    primary: '#58CC02',
    secondary: '#FFC800',
    text: '#4B4B4B',
    textLight: '#777777',
    accent: '#1CB0F6',
    error: '#FF4B4B',
    success: '#58CC02',
    border: '#E5E5E5',
    progressBackground: '#E5E5E5',
    unitIconBackground: '#E0E0E0',
  },
  dark: {
    name: 'dark',
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#58CC02',
    secondary: '#FFC800',
    text: '#FFFFFF',
    textLight: '#BBBBBB',
    accent: '#1CB0F6',
    error: '#FF4B4B',
    success: '#58CC02',
    border: '#2C2C2C',
    progressBackground: '#2C2C2C',
    unitIconBackground: '#3D3D3D',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(themes[savedTheme]);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme.name === 'light' ? themes.dark : themes.light;
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme.name);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);