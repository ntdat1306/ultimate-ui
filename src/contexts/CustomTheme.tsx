import { Theme } from '@emotion/react';
import defaultTheme from '@utils/styles/defaultTheme';
import React, { createContext } from 'react';

export const ThemeContext = createContext(defaultTheme);

interface ThemeProviderProps {
    children?: React.ReactNode;
    theme?: Theme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme = defaultTheme }) => {
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
