import { Theme } from '@emotion/react';
import defaultTheme from '@utils/styles/defaultTheme';
import React, { createContext } from 'react';

export const ThemeContext = createContext(defaultTheme);

interface ThemeProviderProps {
    children?: React.ReactNode;
    customTheme?: Theme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, customTheme = defaultTheme }) => {
    return <ThemeContext.Provider value={customTheme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
