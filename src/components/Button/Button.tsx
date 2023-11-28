import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { ButtonProps } from './Button.types';
import ThemeContextProvider from '../../contexts/ThemeContext';

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
    console.log(props);
    return {
        minWidth: '4rem',
        borderRadius: '0.25rem',
        fontWeight: '500',
        ...(props.size === 'small'
            ? { padding: '0.25rem 0.5rem' }
            : props.size === 'large'
            ? { padding: '0.75rem 1.5rem' }
            : { padding: '0.5rem 1rem' }),
        ...(props.variant === 'primary' && {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        }),
        ...(props.variant === 'secondary' && {
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.main,
        }),
    };
});

const Button: React.FC<ButtonProps> = (props) => {
    const { children, variant = 'primary', size, disabled, ...other } = props;

    return (
        <ThemeContextProvider>
            <StyledButton variant={variant} size={size} disabled={disabled} {...other}>
                {children}
            </StyledButton>
        </ThemeContextProvider>
    );
};

export default Button;
