// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/createPalette.js#L79
import * as colors from '../colors';
import { lighten, darken, getContrastRatio } from './colorManipulator';
import deepMerge from '../system/deepMerge';

// Default mode
export const light = {
    // The colors used to style the text.
    text: {
        // The most important text.
        primary: colors.tailwind.common.black,
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
        hover: 'rgba(0, 0, 0, 0.8)',
        hoverOpacity: 0.8,
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
        hover: 'rgba(255, 255, 255, 0.5)',
        hoverOpacity: 0.5,
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
            main: colors.tailwind.blue[100],
            light: colors.tailwind.blue[50],
            dark: colors.tailwind.blue[600],
        };
};

const getDefaultSecondary = (mode = 'light') => {
    if (mode === 'light')
        return {
            light: colors.tailwind.teal[100],
            main: colors.tailwind.teal[200],
            dark: colors.tailwind.teal[400],
        };
    else
        return {
            main: colors.tailwind.teal[100],
            light: colors.tailwind.teal[50],
            dark: colors.tailwind.teal[600],
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

// Main function
const createPalette = (palette) => {
    const { mode = 'light', contrastThreshold = 3, tonalOffset = 0.2, ...other } = palette;

    const primary = palette.primary || getDefaultPrimary(mode);
    const secondary = palette.secondary || getDefaultSecondary(mode);
    const success = palette.success || getDefaultSuccess(mode);
    const error = palette.error || getDefaultError(mode);
    const info = palette.info || getDefaultInfo(mode);
    const warning = palette.warning || getDefaultWarning(mode);

    const addLightOrDark = (intent, direction, shade, tonalOffset) => {
        const tonalOffsetLight = tonalOffset.light || tonalOffset;
        const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

        // Check if intent don't have `light` or `dark` value
        // Notice: shade default is `300` or `700` (view augmentColor() in below)
        if (!intent[direction]) {
            if (intent.hasOwnProperty(shade)) {
                intent[direction] = intent[shade];
            } else if (direction === 'light') {
                intent.light = lighten(intent.main, tonalOffsetLight);
            } else if (direction === 'dark') {
                intent.dark = darken(intent.main, tonalOffsetDark);
            }
        }
    };

    const getContrastText = (background) => {
        const contrastText =
            getContrastRatio(background, dark.text.primary) >= contrastThreshold
                ? dark.text.primary
                : light.text.primary;

        return contrastText;
    };

    // Using function augmentColor below to generate color if palette lack of color
    const augmentColor = ({ color, name, mainShade = 500, lightShade = 300, darkShade = 700 }) => {
        // If color don't have main but have mainShade (default 500)
        // | primary: {                | primary: {
        // |     500: '#fff',    =>    |     500: '#fff',
        // | },                        |     main: 'fff'
        //                             | },
        if (!color.main && color[mainShade]) {
            color.main = color[mainShade];
        }

        // Check error
        if (!color.hasOwnProperty('main'))
            throw new Error(
                `UUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.\n` +
                    `The color object needs to have a \`main\` property or a \`${mainShade}\` property.`
            );

        if (typeof color.main !== 'string')
            throw new Error(
                `UUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.\n` +
                    `\`color.main\` should be a string, but \`${JSON.stringify(color.main)}\` was provided instead.`
            );

        // Add light and dark color
        addLightOrDark(color, 'light', lightShade, tonalOffset);
        addLightOrDark(color, 'dark', darkShade, tonalOffset);

        // Add contrast
        if (!color.contrastText) {
            color.contrastText = getContrastText(color.main);
        }

        return color;
    };

    // Get mode
    const modes = { light: light, dark: dark };

    // Output
    const paletteOutput = deepMerge(
        {
            // A collection of common colors.
            common: { ...colors.tailwind.common }, // prevent mutable object.
            // The palette mode, can be light or dark.
            mode,
            // The colors used to represent primary interface elements for a user.
            primary: augmentColor({ color: primary, name: 'primary' }),
            // The colors used to represent secondary interface elements for a user.
            secondary: augmentColor({ color: secondary, name: 'secondary' }),
            // The colors used to represent interface elements that the user should be made aware of.
            error: augmentColor({ color: error, name: 'error' }),
            // The colors used to represent potentially dangerous actions or important messages.
            warning: augmentColor({ color: warning, name: 'warning' }),
            // The colors used to present information to the user that is neutral and not necessarily important.
            info: augmentColor({ color: info, name: 'info' }),
            // The colors used to indicate the successful completion of an action that user triggered.
            success: augmentColor({ color: success, name: 'success' }),
            // Used by `getContrastText()` to maximize the contrast between
            // the background and the text.
            contrastThreshold,
            // Takes a background color and returns the text color that maximizes the contrast.
            getContrastText,
            // Generate a rich color object.
            augmentColor,
            // Used by the functions below to shift a color's luminance by approximately
            // two indexes within its tonal palette.
            // E.g., shift from Red 500 to Red 300 or Red 700.
            tonalOffset,
            ...modes[mode],
        },
        other
    );

    return paletteOutput;
};

export default createPalette;
