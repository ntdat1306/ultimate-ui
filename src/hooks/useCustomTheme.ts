import { CustomThemeContext } from '@contexts/CustomTheme';
import React, { useContext } from 'react';

const useCustomTheme = () => {
    const context = useContext(CustomThemeContext);
    return context;
};

export default useCustomTheme;
