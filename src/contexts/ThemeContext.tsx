import React from 'react';
import { ThemeProvider } from '@emotion/react';
import * as colors from '../utils/colors';

const theme = {
    palette: {
        mode: 'light',
        common: {
            black: colors.tailwind.common.black,
            white: colors.tailwind.common.white,
        },
        primary: {
            light: colors.tailwind.blue[300],
            main: colors.tailwind.blue[500],
            dark: colors.tailwind.blue[700],
            contrastText: '#fff',
        },
        secondary: {
            light: colors.tailwind.blue[50],
            main: colors.tailwind.blue[100],
            dark: colors.tailwind.blue[200],
            contrastText: colors.tailwind.blue[600],
        },
        success: {
            light: colors.tailwind.green[300],
            main: colors.tailwind.green[500],
            dark: colors.tailwind.green[700],
            contrastText: '#fff',
        },
        error: {
            light: colors.tailwind.red[300],
            main: colors.tailwind.red[500],
            dark: colors.tailwind.red[700],
            contrastText: '#fff',
        },
        text: {
            primary: colors.tailwind.blue[100],
            secondary: colors.tailwind.blue[100],
            disabled: colors.tailwind.blue[100],
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        background: {
            paper: '#fff',
            default: '#fff',
        },
        action: {
            hover: 'rgba(0, 0, 0, 0.04)',
            hoverOpacity: 0.04,
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            disabledOpacity: 0.38,
        },
    },
    shape: {
        borderRadius: 0.25,
    },
    typography: {
        button: {
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
            fontWeight: '500',
            fontSize: '0.875rem',
            lineHeight: 1.25,
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
