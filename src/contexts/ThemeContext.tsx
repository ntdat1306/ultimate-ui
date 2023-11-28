import React from 'react';
import { ThemeProvider } from '@emotion/react';
import * as colors from '../utils/colors';

const theme = {
    palette: {
        primary: {
            light: colors.tailwind.blue[300],
            main: colors.tailwind.blue[500],
            dark: colors.tailwind.blue[700],
            contrastText: '#fff',
        },
        secondary: {
            light: colors.tailwind.blue[100],
            main: colors.tailwind.blue[300],
            dark: colors.tailwind.blue[500],
            contrastText: colors.tailwind.blue[700],
        },
    },
};

interface ThemeContextProviderProps {
    children?: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContextProvider;
