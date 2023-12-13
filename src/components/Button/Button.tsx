import React, { useRef } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { ButtonIconProps, ButtonProps, ButtonRef, StyledButtonProps } from './Button.types';
import { alpha } from '@utils/styles/colorManipulator';
import ThemeContextProvider from '@contexts/ThemeContext';
import * as colors from '@utils/colors';
import mergeRefs from '@utils/system/mergeRefs';
import useRippleIn from '@hooks/useRippleIn';
import useRippleOut from '@hooks/useRippleOut';

const ButtonBase = styled('button')({
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
})<StyledButtonProps>(({ theme, ...props }) => {
    return {
        ...theme.typography.button,
        minWidth: '4rem',
        borderRadius: theme.shape.borderRadius,
        textDecoration: 'none',
        ...(props.effect === 'rippleIn' && { overflow: 'hidden' }), // For rippleIn effect
        ...(props.color !== 'inherit' && { outlineColor: theme.palette[props.color].main }), // For rippleOut effect
        // Size
        ...(props.size === 'small'
            ? { padding: '0.25rem 0.5rem' }
            : props.size === 'large'
            ? { padding: '0.75rem 1.5rem' }
            : { padding: '0.5rem 1rem' }),
        // Contained and not inherit
        ...(props.variant === 'contained'
            ? props.color !== 'inherit' && {
                  color: theme.palette[props.color].contrastText,
                  backgroundColor: theme.palette[props.color].main,
                  border: `1px solid ${theme.palette[props.color].main}`,
                  '&:hover': {
                      backgroundColor: theme.palette[props.color].dark,
                  },
                  '&:disabled': {
                      color: theme.palette.action.disabled,
                      backgroundColor: theme.palette.action.disabledBackground,
                      border: `1px solid ${theme.palette.action.disabledBackground}`,
                      pointerEvents: 'none',
                  },
              }
            : {}),
        // Outlined and not inherit
        ...(props.variant === 'outlined' &&
            props.color !== 'inherit' && {
                color: theme.palette[props.color].main,
                border: `1px solid ${theme.palette[props.color].main}`,
                '&:hover': {
                    backgroundColor: alpha(theme.palette[props.color].main, theme.palette.action.hoverOpacity),
                },
                '&:disabled': {
                    color: theme.palette.action.disabled,
                    border: `1px solid ${theme.palette.action.disabledBackground}`,
                    pointerEvents: 'none',
                },
            }),
        // Text and not inherit
        ...(props.variant === 'text' &&
            props.color !== 'inherit' && {
                color: theme.palette[props.color].main,
                border: `1px solid transparent`,
                '&:hover': {
                    backgroundColor: alpha(theme.palette[props.color].main, theme.palette.action.hoverOpacity),
                },
                '&:disabled': {
                    color: theme.palette.action.disabled,
                    pointerEvents: 'none',
                },
            }),
        // Inherit
        ...(props.color === 'inherit' && {
            color: 'inherit',
            borderWidth: '1px',
            borderStyle: 'solid',
            // Contained
            ...(props.variant === 'contained' && {
                borderColor: colors.tailwind.gray[300],
                backgroundColor: colors.tailwind.gray[300],
                '&:hover': {
                    backgroundColor: colors.tailwind.gray[100],
                },
                '&:disabled': {
                    color: theme.palette.action.disabled,
                    backgroundColor: theme.palette.action.disabledBackground,
                    border: `1px solid ${theme.palette.action.disabledBackground}`,
                    pointerEvents: 'none',
                },
            }),
            // Outlined
            ...(props.variant === 'outlined' && {
                borderColor: 'currentcolor',
                '&:hover': {
                    backgroundColor: alpha(colors.tailwind.gray[500], theme.palette.action.hoverOpacity),
                },
                '&:disabled': {
                    color: theme.palette.action.disabled,
                    border: `1px solid ${theme.palette.action.disabledBackground}`,
                    pointerEvents: 'none',
                },
            }),
            // Text
            ...(props.variant === 'text' && {
                borderColor: 'transparent',
                '&:hover': {
                    backgroundColor: alpha(colors.tailwind.gray[500], theme.palette.action.hoverOpacity),
                },
                '&:disabled': {
                    color: theme.palette.action.disabled,
                    pointerEvents: 'none',
                },
            }),
        }),
    };
});

const IconBase = styled('svg')({
    display: 'inline-block',
    width: '1em',
    height: '1em',
    fill: 'currentcolor',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    flexShrink: 0,
    WebkitFlexShrink: 0,
    msFlexPositive: 1,
});

const StyledStartIcon = styled(IconBase, {
    shouldForwardProp: (prop) => isPropValid(prop),
})<ButtonIconProps>(({ theme, ...props }) => {
    return {
        ...(props.size === 'small'
            ? { fontSize: props.fontSize || '1.125rem', marginRight: '0.25rem' }
            : props.size === 'large'
            ? { fontSize: props.fontSize || '1.5rem', marginRight: '0.5rem' }
            : { fontSize: props.fontSize || '1.25rem', marginRight: '0.5rem' }),
    };
});

const StyledEndIcon = styled(IconBase, {
    shouldForwardProp: (prop) => isPropValid(prop),
})<ButtonIconProps>(({ theme, ...props }) => {
    return {
        ...(props.size === 'small'
            ? { fontSize: props.fontSize || '1.125rem', marginLeft: '0.25rem' }
            : props.size === 'large'
            ? { fontSize: props.fontSize || '1.5rem', marginLeft: '0.5rem' }
            : { fontSize: props.fontSize || '1.25rem', marginLeft: '0.5rem' }),
    };
});

const Button = <E extends React.ElementType = 'button'>(props: ButtonProps<E>) => {
    const {
        children,
        as,
        variant = 'contained',
        color = 'primary',
        size = 'medium',
        effect,
        refElement,
        startIcon,
        endIcon,
        ...other
    } = props;

    const tag = as || 'button';
    const startIconProps = startIcon?.props;
    const endIconProps = endIcon?.props;

    // Ripple
    const rippleRef = useRef<HTMLButtonElement>(null);
    const rippleIn = useRippleIn(rippleRef);
    const rippleOut = useRippleOut(rippleRef, color);

    // Component
    const startIconComponent = startIcon && startIconProps && (
        <StyledStartIcon size={size} {...startIconProps}>
            {startIconProps.children}
        </StyledStartIcon>
    );

    const endIconComponent = endIcon && endIconProps && (
        <StyledEndIcon size={size} {...endIconProps}>
            {endIconProps.children}
        </StyledEndIcon>
    );

    const effectAnimation = effect === 'rippleIn' ? rippleIn : effect === 'rippleOut' ? rippleOut : null;

    return (
        <ThemeContextProvider>
            <StyledButton
                variant={variant}
                color={color}
                size={size}
                effect={effect}
                as={tag}
                ref={mergeRefs([rippleRef, refElement])}
                {...other}
            >
                {startIconComponent}
                {children}
                {endIconComponent}
                {effectAnimation}
            </StyledButton>
        </ThemeContextProvider>
    );
};

export default Button;
