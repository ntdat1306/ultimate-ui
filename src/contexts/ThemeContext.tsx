import React from 'react';
import { ThemeProvider } from '@emotion/react';
import * as colors from '../utils/colors';
import { createPalette } from '../utils/styles';

const theme = {
    palette: createPalette({
        primary: {
            main: '#000',
        },
    }),
};

console.log(theme.palette);

interface ThemeContextProviderProps {
    children?: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContextProvider;
