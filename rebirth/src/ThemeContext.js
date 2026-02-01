// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const ThemeContext = createContext();

// 2. Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // default theme

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Hook to consume the context
export const useTheme = () => useContext(ThemeContext);
