import { Theme } from '@emotion/react';
import defaultTheme from '@utils/styles/defaultTheme';
import React, { createContext } from 'react';

export const CustomThemeContext = createContext(defaultTheme);

interface CustomThemeProviderProps {
    children?: React.ReactNode;
    customTheme?: Theme;
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children, customTheme = defaultTheme }) => {
    return <CustomThemeContext.Provider value={customTheme}>{children}</CustomThemeContext.Provider>;
};

export default CustomThemeProvider;
