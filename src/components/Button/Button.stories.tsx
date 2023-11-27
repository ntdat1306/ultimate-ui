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

export const Primary: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Primary.args = {
    variant: 'primary'
};

export const Secondary: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Secondary.args = {
    variant: 'secondary',
    disabled: false,
};

export const Disabled: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Disabled.args = {
    variant: 'primary',
    disabled: true,
};

export const Small: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Small.args = {
    variant: 'primary',
    disabled: false,
    size: 'small',
};

export const Large: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Large.args = {
    variant: 'primary',
    disabled: false,
    size: 'large',
};
