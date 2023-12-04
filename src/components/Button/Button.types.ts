type Variant = 'contained' | 'outlined' | 'text';
type Color = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
type Size = 'small' | 'medium' | 'large';
type Effect = 'rippleIn' | 'rippleOut';
type Icon = JSX.Element;

export type ButtonOwnProps<E extends React.ElementType> = {
    children?: React.ReactNode;
    variant?: Variant;
    color?: Color;
    size?: Size;
    effect?: Effect;
    startIcon?: Icon;
    endIcon?: Icon;
    as?: E;
    refElement?: ButtonRef<E>;
};

export interface ButtonIconProps {
    size?: Size;
}

export type ButtonRef<E extends React.ElementType> = React.ComponentPropsWithRef<E>['ref'];

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
    Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>;

export type StyledButtonProps = ButtonProps<any> & {
    variant: Variant;
    color: Color;
    size: Size;
};
