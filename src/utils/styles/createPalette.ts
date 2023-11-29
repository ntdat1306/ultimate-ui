import * as colors from '../colors';

// Default mode
export const light = {
    // The colors used to style the text.
    text: {
        // The most important text.
        primary: 'rgba(0, 0, 0, 0.87)',
        // Secondary text.
        secondary: 'rgba(0, 0, 0, 0.6)',
        // Disabled text have even lower visual prominence.
        disabled: 'rgba(0, 0, 0, 0.38)',
    },
    // The color used to divide different elements.
    divider: 'rgba(0, 0, 0, 0.12)',
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
        paper: colors.tailwind.common.white,
        default: colors.tailwind.common.white,
    },
    // The colors used to style the action elements.
    action: {
        // The color of an active action like an icon button.
        active: 'rgba(0, 0, 0, 0.54)',
        // The color of an hovered action.
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: 0.04,
        // The color of a selected action.
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        // The color of a disabled action.
        disabled: 'rgba(0, 0, 0, 0.26)',
        // The background color of a disabled action.
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
    },
};

export const dark = {
    text: {
        primary: colors.tailwind.common.white,
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
        paper: '#121212',
        default: '#121212',
    },
    action: {
        active: colors.tailwind.common.white,
        hover: 'rgba(255, 255, 255, 0.08)',
        hoverOpacity: 0.08,
        selected: 'rgba(255, 255, 255, 0.16)',
        selectedOpacity: 0.16,
        disabled: 'rgba(255, 255, 255, 0.3)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(255, 255, 255, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.24,
    },
};

// Default color
const getDefaultPrimary = (mode = 'light') => {
    if (mode === 'light')
        return {
            main: colors.tailwind.blue[500],
            light: colors.tailwind.blue[300],
            dark: colors.tailwind.blue[700],
        };
    else
        return {
            main: colors.tailwind.blue[200],
            light: colors.tailwind.blue[50],
            dark: colors.tailwind.blue[400],
        };
};

const getDefaultSecondary = (mode = 'light') => {
    if (mode === 'light')
        return {
            light: colors.tailwind.blue[50],
            main: colors.tailwind.blue[100],
            dark: colors.tailwind.blue[200],
        };
    else
        return {
            main: colors.tailwind.blue[200],
            light: colors.tailwind.blue[50],
            dark: colors.tailwind.blue[400],
        };
};

const getDefaultSuccess = (mode = 'light') => {
    if (mode === 'light')
        return {
            main: colors.tailwind.green[500],
            light: colors.tailwind.green[300],
            dark: colors.tailwind.green[700],
        };
    else
        return {
            main: colors.tailwind.green[200],
            light: colors.tailwind.green[50],
            dark: colors.tailwind.green[400],
        };
};

const getDefaultError = (mode = 'light') => {
    if (mode === 'light')
        return {
            main: colors.tailwind.red[500],
            light: colors.tailwind.red[300],
            dark: colors.tailwind.red[700],
        };
    else
        return {
            main: colors.tailwind.red[200],
            light: colors.tailwind.red[50],
            dark: colors.tailwind.red[400],
        };
};

const getDefaultInfo = (mode = 'light') => {
    if (mode === 'light')
        return {
            main: colors.tailwind.cyan[500],
            light: colors.tailwind.cyan[300],
            dark: colors.tailwind.cyan[700],
        };
    else
        return {
            main: colors.tailwind.cyan[200],
            light: colors.tailwind.cyan[50],
            dark: colors.tailwind.cyan[400],
        };
};

const getDefaultWarning = (mode = 'light') => {
    if (mode === 'light')
        return {
            main: colors.tailwind.orange[500],
            light: colors.tailwind.orange[300],
            dark: colors.tailwind.orange[700],
        };
    else
        return {
            main: colors.tailwind.orange[200],
            light: colors.tailwind.orange[50],
            dark: colors.tailwind.orange[400],
        };
};

// Using function augmentColor below to generate color if palette lack of color
const augmentColor = ({ color, name, mainShade = 500, lightShade = 300, darkShade = 700 }: any) => {
    color = { ...color };
    console.log(color[mainShade]);
    // If color don't have main but have mainShade
    if (!color.main && color[mainShade]) {
        color.main = color[mainShade];
    }

    // if (!color.hasOwnProperty('main'))
    //     throw new Error('The color object needs to have a `main` property or a `mainShade` property.');
};

const createPalette = (palette: any) => {
    const { mode = 'light', contrastThreshold = 3, tonalOffset = 0.2, ...other } = palette;

    const primary = palette.primary || getDefaultPrimary(mode);
    const secondary = palette.secondary || getDefaultSecondary(mode);
    const success = palette.success || getDefaultSuccess(mode);
    const error = palette.error || getDefaultError(mode);
    const info = palette.info || getDefaultInfo(mode);
    const warning = palette.warning || getDefaultWarning(mode);

    const paletteOutput = {
        primary: augmentColor({ color: primary, name: 'primary', mainShade: 'A400' }),
        // secondary,
        // success,
        // error,
        // info,
        // warning,
        ...other,
    };

    return paletteOutput;
};

export default createPalette;
