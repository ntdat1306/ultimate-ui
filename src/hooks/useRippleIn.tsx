import React, { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { keyframes } from '@emotion/react';
import { duration } from '../utils/styles/createTransitions';

interface StyledSpanProps extends React.HTMLProps<HTMLSpanElement> {
    duration: number;
}

const rippleAnimation = keyframes`
    to {
        transform: scale(4);
        opacity: 0;
    }
`;

const StyledSpan = styled('span', {
    shouldForwardProp: (prop) => isPropValid(prop),
})<StyledSpanProps>(({ theme, ...props }) => {
    return {
        position: 'absolute',
        backgroundColor: 'currentColor',
        opacity: '0.25',
        transform: 'scale(0)',
        // Add ripple animation
        animation: `${rippleAnimation} ${props.duration}ms linear`,
        borderRadius: '50%',
    };
});

/**
 * This hook accepts a ref to any element and adds a click event handler that creates ripples when click
 */
const useRippleIn = <T extends HTMLElement>(ref: React.RefObject<T>, duration: number = 600) => {
    //rRipples are just styles that we attach to span elements
    const [ripples, setRipples] = useState<React.CSSProperties[]>([]);

    useEffect(() => {
        // Check if there's a ref
        if (ref.current) {
            const elem = ref.current;

            // Add a click handler for the ripple
            const clickHandler = (e: MouseEvent) => {
                // Calculate the position and dimensions of the ripple.
                // Based on click position and button dimensions
                var rect = elem.getBoundingClientRect();
                var left = e.clientX - rect.left;
                var top = e.clientY - rect.top;
                const height = elem.clientHeight;
                const width = elem.clientWidth;
                const diameter = Math.max(width, height);
                setRipples([
                    ...ripples,
                    {
                        top: top - diameter / 2,
                        left: left - diameter / 2,
                        height: Math.max(width, height),
                        width: Math.max(width, height),
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
    const _debounced = useDebounce(ripples, 1000);
    useEffect(() => {
        if (_debounced.length) {
            setRipples([]);
        }
    }, [_debounced.length]);

    // Map through the ripples and return span elements.
    // This will be added to the button component later
    return ripples?.map((style, i) => {
        return <StyledSpan key={i} duration={duration} style={{ ...style }} />;
    });
};

export default useRippleIn;
