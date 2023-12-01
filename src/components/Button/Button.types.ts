export type ButtonOwnProps<E extends React.ElementType> = {
    children?: React.ReactNode;
    variant?: 'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    as?: E;
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
    Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

export type StyledButtonProps = ButtonProps<any> & {
    variant: 'contained' | 'outlined' | 'text';
    size: 'small' | 'medium' | 'large';
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};
