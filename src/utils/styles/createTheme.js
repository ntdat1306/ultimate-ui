import deepMerge from '../system/deepMerge';
import createPalette from './createPalette';
import createTypography from './createTypography';
import shadows from './createShadow';

// Theme composition: using theme options to define other options, eg below:
// let theme = createTheme({
//     palette: {
//         primary: {
//             main: '#0052cc',
//         },
//         secondary: {
//             main: '#edf2ff',
//         },
//     },
// });

// theme = createTheme(theme, {
//     palette: {
//         info: {
//             main: theme.palette.secondary.main,
//         },
//     },
// });

function createTheme(options = {}, ...args) {
    const { palette: paletteInput = {}, typography: typographyInput = {}, ...other } = options;
    const palette = createPalette(paletteInput);
    let uuiTheme = deepMerge(
        {
            palette: palette,
        },
        {
            typography: createTypography(palette, typographyInput),
            // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
            shadows: shadows.slice(),
            shape: {
                borderRadius: 4,
            },
        }
    );

    uuiTheme = deepMerge(uuiTheme, other);
    uuiTheme = args.reduce((acc, argument) => deepMerge(acc, argument), uuiTheme);

    return uuiTheme;
}

export default createTheme;
