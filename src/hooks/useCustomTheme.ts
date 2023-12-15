import { ThemeContext } from '@contexts/CustomTheme';
import React, { useContext } from 'react';

const useCustomTheme = () => {
    const context = useContext(ThemeContext);
    return context;
};

export default useCustomTheme;
