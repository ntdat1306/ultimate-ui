import { Palette, PaletteOptions } from './createPalette';
import { Typography, TypographyOptions } from './createTypography';

export interface Theme {
    palette?: Record<string, any> & { mode: 'light' | 'dark' };
    typography?: unknown;
}

export interface SystemThemeOptions {
    palette?: Record<string, any>;
    typography?: unknown;
}

export interface ThemeOptions extends SystemThemeOptions {
    palette?: PaletteOptions;
    typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
