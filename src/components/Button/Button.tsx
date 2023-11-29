import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { ButtonBaseProps, ButtonProps } from './Button.types';

import { alpha } from '@utils/styles/colorManipulator';
import ThemeContextProvider from '@contexts/ThemeContext';

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
})<ButtonProps>(({ theme, ...props }) => {
    console.log(props);

    return {
        ...theme.typography.button,
        minWidth: '4rem',
        borderRadius: theme.shape.borderRadius,
        // Size
        ...(props.size === 'small'
            ? { padding: '0.25rem 0.5rem' }
            : props.size === 'large'
            ? { padding: '0.75rem 1.5rem' }
            : { padding: '0.5rem 1rem' }),
        // Primary
        ...(props.variant === 'contained' &&
            props.color !== 'inherit' && {
                color: theme.palette[props.color].contrastText,
                backgroundColor: theme.palette[props.color].main,
                border: `1px solid ${theme.palette[props.color].main}`,
                '&:hover': {
                    backgroundColor: alpha(theme.palette[props.color].main, theme.palette.action.hoverOpacity),
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

const Button: React.FC<ButtonBaseProps> = (props) => {
    const { children, variant = 'contained', color = 'primary', size = 'medium', disabled, ...other } = props;

    return (
        <ThemeContextProvider>
            <StyledButton variant={variant} color={color} size={size} disabled={disabled} {...other}>
                {children}
            </StyledButton>
        </ThemeContextProvider>
    );
};

export default Button;
