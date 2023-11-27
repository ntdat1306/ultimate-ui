import React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { ButtonProps } from './Button.types';

const ButtonBase = styled.button({
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
})((props: ButtonProps) => ({
    ...(props.variant === 'primary' && { color: 'green' }),
}));

const Button: React.FC<ButtonProps> = (props) => {
    const { children, variant, size, disabled, ...other } = props;

    return (
        <StyledButton variant={variant} size={size} disabled={disabled} {...other}>
            {children}
        </StyledButton>
    );
};

export default Button;
