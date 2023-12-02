import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ButtonProps } from './Button.types';

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Ultimate/Button',
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Button>;

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
