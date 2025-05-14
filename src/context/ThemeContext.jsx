import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const [currency , setCurrency] = useState('USD');

  return (
    <ThemeContext.Provider value={{ theme , setTheme,currency , setCurrency }}>
      {children}
    </ThemeContext.Provider>
  );
};

