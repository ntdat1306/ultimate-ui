import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@utils/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

console.log(theme);

interface ThemeContextProviderProps {
    children?: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContextProvider;
