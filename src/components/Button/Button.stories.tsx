import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ButtonProps } from './Button.types';
import styled from '@emotion/styled';
import ThemeProvider from '../../contexts/CustomTheme';
import { createTheme } from '../../utils';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Ultimate/Button',
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Button>;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

// Theme
const theme = createTheme({ palette: { primary: { main: '#f5584d' } } });
export const CustomTheme: Story = (args: ButtonProps<any>) => (
    <ThemeProvider theme={theme}>
        <Button {...args}>Button</Button>
    </ThemeProvider>
);
CustomTheme.args = {
    variant: 'contained',
};

export const Contained: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
Contained.args = {
    variant: 'contained',
};

export const Outlined: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
Outlined.args = {
    variant: 'outlined',
};

export const Text: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
Text.args = {
    variant: 'text',
};

export const Link: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
Link.args = {
    href: 'https://emotion.sh/docs/styled',
};

export const Disabled: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
Disabled.args = {
    disabled: true,
};

export const StartIcon: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
StartIcon.args = {
    startIcon: (
        <svg aria-hidden='true' viewBox='0 0 24 24'>
            <path d='M2.01 21 23 12 2.01 3 2 10l15 2-15 2z'></path>
        </svg>
    ),
};

export const EndIcon: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
EndIcon.args = {
    endIcon: (
        <svg aria-hidden='true' viewBox='0 0 24 24'>
            <path d='M2.01 21 23 12 2.01 3 2 10l15 2-15 2z'></path>
        </svg>
    ),
};

export const RippleIn: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
RippleIn.args = {
    effect: 'rippleIn',
};

export const RippleOut: Story = (args: ButtonProps<any>) => <Button {...args}>Button</Button>;
RippleOut.args = {
    effect: 'rippleOut',
};

export const FileUpload: Story = (args: ButtonProps<any>) => (
    <Button {...args}>
        Button <VisuallyHiddenInput type='file' />
    </Button>
);
FileUpload.args = {
    as: 'label',
    startIcon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
            <path
                fill='currentColor'
                d='M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z'
            />
        </svg>
    ),
};
