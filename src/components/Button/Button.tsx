import React from 'react';
import styled from '@emotion/styled';
import { ButtonProps } from './Button.types';

const StyledButton = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    min-width: 64px;
    border-radius: 0.5rem;
    padding: ${(props) =>
        props.size === 'small' ? '0.25rem 0.5rem' : props.size === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem'};
    color: ${(props) => (props.primary ? '#fafafa' : '#18181b')};
    background-color: ${(props) => (props.primary ? '#18181b' : '#f4f4f5')};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Button: React.FC<ButtonProps> = (props) => {
    const { text, size, primary, variant, disabled, onClick, ...other } = props;

    return (
        <StyledButton
            type='button'
            onClick={onClick}
            size={size}
            primary={primary}
            variant={variant}
            disabled={disabled}
            {...other}
        >
            {text}
        </StyledButton>
    );
};

export default Button;
