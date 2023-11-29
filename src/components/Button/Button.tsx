import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { ButtonProps } from './Button.types';
import ThemeContextProvider from '../../contexts/ThemeContext';
import { createPalette } from '../../utils/styles';

const ButtonBase = styled('button')<ButtonProps>({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
        borderStyle: 'none', // Remove Firefox dotted outline.
    },
    '@media print': {
        colorAdjust: 'exact',
    },
});

const StyledButton = styled(ButtonBase, {
    shouldForwardProp: (prop) => isPropValid(prop),
})(({ theme, ...props }) => {
    return {
        ...theme.typography.button,
        minWidth: '4rem',
        borderRadius: `${theme.shape.borderRadius}rem`,
        // Size
        ...(props.size === 'small'
            ? { padding: '0.25rem 0.5rem' }
            : props.size === 'large'
            ? { padding: '0.75rem 1.5rem' }
            : { padding: '0.5rem 1rem' }),
        // Primary
        ...(props.variant === 'primary' && {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        }),
        // Secondary
        ...(props.variant === 'secondary' && {
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
            },
        }),
        // Outline
        ...(props.variant === 'outline' && {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.primary.main}`,
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
            },
        }),
        // Ghost
        ...(props.variant === 'ghost' && {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.background.default,
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
            },
        }),
        // Disabled
        ...(props.disabled && {
            color: theme.palette.action.disabled,
            backgroundColor: theme.palette.action.disabledBackground,
            '&:hover': 'none',
            pointerEvents: 'none',
        }),
    };
});

const Button: React.FC<ButtonProps> = (props) => {
    const { children, variant = 'primary', size, disabled, ...other } = props;
    const theme = createPalette({
        primary: {
            500: '#fff',
            300: '#dddddd',
            main: 'fff',
        },
    });
    console.log(theme);

    return (
        <ThemeContextProvider>
            <StyledButton variant={variant} size={size} disabled={disabled} {...other}>
                {children}
            </StyledButton>
        </ThemeContextProvider>
    );
};

export default Button;
