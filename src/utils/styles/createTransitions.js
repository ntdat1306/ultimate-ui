// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/createTransitions.js
// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
export const easing = {
    // This is the most common easing curve.
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Objects enter the screen at full velocity from off-screen and
    // slowly decelerate to a resting point.
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    // Objects leave the screen at full velocity. They do not decelerate when off-screen.
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    // The sharp curve is used by objects that may return to the screen at any time.
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

// Follow https://m2.material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing
export const duration = {
    shortest: 150,
    shorter: 200,
    short: 250,
    // most basic recommended timing
    standard: 300,
    // this is to be used in complex animations
    complex: 375,
    // recommended when something is entering screen
    enteringScreen: 225,
    // recommended when something is leaving screen
    leavingScreen: 195,
};

function formatMs(milliseconds) {
    return `${Math.round(milliseconds)}ms`;
}

function getAutoHeightDuration(height) {
    if (!height) {
        return 0;
    }

    const constant = height / 36;

    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export default function createTransitions(inputTransitions) {
    const mergedEasing = {
        ...easing,
        ...inputTransitions.easing,
    };

    const mergedDuration = {
        ...duration,
        ...inputTransitions.duration,
    };

    const create = (props = ['all'], options = {}) => {
        const {
            duration: durationOption = mergedDuration.standard,
            easing: easingOption = mergedEasing.easeInOut,
            delay = 0,
            ...other
        } = options;

        return (Array.isArray(props) ? props : [props])
            .map(
                (animatedProp) =>
                    `${animatedProp} ${
                        typeof durationOption === 'string' ? durationOption : formatMs(durationOption)
                    } ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`
            )
            .join(',');
    };

    return {
        getAutoHeightDuration,
        create,
        ...inputTransitions,
        easing: mergedEasing,
        duration: mergedDuration,
    };
}
