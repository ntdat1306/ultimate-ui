import { Theme } from '@emotion/react';
import React, { createContext } from 'react';
import { defaultTheme } from './ThemeContext';

export const CustomThemeContext = createContext(defaultTheme);

interface CustomThemeProviderProps {
    children?: React.ReactNode;
    customTheme?: Theme;
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children, customTheme = defaultTheme }) => {
    return <CustomThemeContext.Provider value={customTheme}>{children}</CustomThemeContext.Provider>;
};

export default CustomThemeProvider;
