import React, { useRef } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { ButtonIconProps, ButtonProps, StyledButtonProps } from './Button.types';
import ButtonBase from '@components/ButtonBase';
import { alpha } from '@utils/styles/colorManipulator';
import * as colors from '@utils/colors';
import mergeRefs from '@utils/system/mergeRefs';
import useRippleIn from '@hooks/useRippleIn';
import useRippleOut from '@hooks/useRippleOut';
import useCustomTheme from '@hooks/useCustomTheme';
import { UuiLoading } from '@components/Icon/Icon';
import { keyframes } from '@emotion/react';

// Loading animation
const spinner = keyframes`
0% {
    transform: rotate(0);
}

100% {
    transform: rotate(360deg);
}
`;

const StyledButton = styled(ButtonBase, {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'loading',
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
                      border: `1px solid ${theme.palette[props.color].dark}`,
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
        // Loading
        ...(props.loading && {
            opacity: 0.5,
            pointerEvents: 'none',
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

const StyledLoadingIcon = styled(IconBase, {
    shouldForwardProp: (prop) => isPropValid(prop),
})<ButtonIconProps>(({ theme, ...props }) => {
    return {
        animation: `${spinner} ${props.loadingSpeed}ms infinite ease-in-out`,
        ...(props.size === 'small'
            ? {
                  fontSize: props.fontSize || '1.125rem',
                  ...(props.loadingPosition === 'start' ? { marginRight: '0.25rem' } : { marginLeft: '0.25rem' }),
              }
            : props.size === 'large'
            ? {
                  fontSize: props.fontSize || '1.5rem',
                  ...(props.loadingPosition === 'start' ? { marginRight: '0.5rem' } : { marginLeft: '0.5rem' }),
              }
            : {
                  fontSize: props.fontSize || '1.25rem',
                  ...(props.loadingPosition === 'start' ? { marginRight: '0.5rem' } : { marginLeft: '0.5rem' }),
              }),
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
        loading,
        loadingPosition = 'end',
        loadingIcon = UuiLoading(),
        loadingSpeed = 1000,
        ...other
    } = props;

    const tag = as || 'button';
    const startIconProps = startIcon?.props;
    const endIconProps = endIcon?.props;
    const loadingIconProps = loadingIcon?.props;

    // Custom theme
    const customTheme = useCustomTheme();

    // Ripple
    const rippleRef = useRef<HTMLButtonElement>(null);
    const rippleIn = useRippleIn(rippleRef);
    const rippleOut = useRippleOut(rippleRef, color);

    // Component
    const startIconComponent = !loading && startIcon && startIconProps && (
        <StyledStartIcon size={size} {...startIconProps}>
            {startIconProps.children}
        </StyledStartIcon>
    );

    const endIconComponent = !loading && endIcon && endIconProps && (
        <StyledEndIcon size={size} {...endIconProps}>
            {endIconProps.children}
        </StyledEndIcon>
    );

    const loadingIconComponent = loading && loadingIcon && loadingIconProps && (
        <StyledLoadingIcon
            size={size}
            loadingPosition={loadingPosition}
            loadingSpeed={loadingSpeed}
            {...loadingIconProps}
        >
            {loadingIconProps.children}
        </StyledLoadingIcon>
    );

    const getChildrenComponent = () => {
        // There is a known issue with translating a page using Chrome tools when a Loading Button is present. After the page is translated, the application crashes when the loading state of a Button changes. To prevent this, ensure that the contents of the Loading Button are nested inside any HTML element, such as a <span>
        if (loading) {
            if (loadingPosition === 'start')
                return (
                    <>
                        {loadingIconComponent}
                        <span>{children}</span>
                    </>
                );
            else
                return (
                    <>
                        <span>{children}</span>
                        {loadingIconComponent}
                    </>
                );
        } else return children;
    };

    const effectAnimation = effect === 'rippleIn' ? rippleIn : effect === 'rippleOut' ? rippleOut : null;

    return (
        <StyledButton
            variant={variant}
            color={color}
            size={size}
            effect={effect}
            as={tag}
            loading={loading}
            ref={mergeRefs([rippleRef, refElement])}
            theme={customTheme}
            {...other}
        >
            {startIconComponent}
            {getChildrenComponent()}
            {endIconComponent}
            {effectAnimation}
        </StyledButton>
    );
};

export default Button;
