export type ButtonOwnProps<E extends React.ElementType> = {
    children?: React.ReactNode;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    size?: 'small' | 'medium' | 'large';
    as?: E;
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
    Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

export type StyledButtonProps = ButtonProps<any> & {
    variant: 'contained' | 'outlined' | 'text';
    size: 'small' | 'medium' | 'large';
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

export type ButtonRef<E extends React.ElementType> = React.ComponentPropsWithRef<E>['ref'];
