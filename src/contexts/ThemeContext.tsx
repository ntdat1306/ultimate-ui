import React from 'react';
import { Theme, ThemeProvider } from '@emotion/react';
import createTheme from '@utils/styles/createTheme';
import deepMerge from '@utils/system/deepMerge';

export const defaultTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

interface ThemeContextProviderProps {
    children?: React.ReactNode;
    customTheme?: Theme;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children, customTheme }) => {
    console.log(deepMerge(defaultTheme, customTheme));

    return <ThemeProvider theme={deepMerge(defaultTheme, customTheme)}>{children}</ThemeProvider>;
};

export default ThemeContextProvider;
