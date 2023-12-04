import React, { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { keyframes } from '@emotion/react';
import { duration } from '../utils/styles/createTransitions';

interface StyledSpanProps extends React.HTMLProps<HTMLSpanElement> {
    duration: number;
}

const rippleOutAnimation = keyframes`
    to {
        outline-width: 8px;
        opacity: 0;
    }
`;

const StyledSpan = styled('span', {
    shouldForwardProp: (prop) => isPropValid(prop),
})<StyledSpanProps>(({ theme, ...props }) => {
    return {
        position: 'absolute',
        zIndex: -1,
        backgroundColor: 'inherit',
        animation: `${rippleOutAnimation} ${props.duration}ms linear`,
        borderRadius: 'inherit',
        opacity: 0.4,
        boxSizing: 'border-box',
        outlineWidth: '0px',
        outlineStyle: 'solid',
        outlineColor: 'inherit',
        pointerEvents: 'none',
        userSelect: 'none',
    };
});

/**
 * This hook accepts a ref to any element and adds a click event handler that creates ripples when click
 */
const useRippleOut = <T extends HTMLElement>(
    ref: React.RefObject<T>,
    color: string = 'red',
    duration: number = 500
) => {
    //rRipples are just styles that we attach to span elements
    const [ripples, setRipples] = useState<React.CSSProperties[]>([]);

    useEffect(() => {
        // Check if there's a ref
        if (ref.current) {
            const elem = ref.current;
            const clickHandler = (e: MouseEvent) => {
                setRipples([
                    ...ripples,
                    {
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                    },
                ]);
            };

            // Add an event listener to the button
            elem.addEventListener('click', clickHandler);

            // Clean up when the component is unmounted
            return () => {
                elem.removeEventListener('click', clickHandler);
            };
        }
    }, [ref, ripples]);

    // Add a debounce so that if the user doesn't click after 1s, we remove the ripples
    const _debounced = useDebounce(ripples, duration);

    useEffect(() => {
        if (_debounced.length) {
            setRipples([]);
        }
    }, [_debounced.length]);

    // Map through the ripples and return span elements.
    // This will be added to the button component later
    return ripples?.map((style, i) => {
        return <StyledSpan key={i} color={color} duration={duration} style={{ ...style }} />;
    });
};

export default useRippleOut;
