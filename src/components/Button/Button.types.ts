import { MouseEventHandler } from 'react';

export interface ButtonProps {
    text?: string;
    size?: 'small' | 'large';
    primary?: boolean;
    variant?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
