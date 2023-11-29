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

export const Contained: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Contained.args = {
    variant: 'contained',
};

export const Outline: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Outline.args = {
    variant: 'outline',
};

export const Text: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Text.args = {
    variant: 'text',
};

export const Disabled: Story = (args: ButtonProps) => <Button {...args}>Button</Button>;
Disabled.args = {
    disabled: true,
};
