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

export const Primary: Story = (args: ButtonProps) => <Button data-testId='InputField-id' {...args} />;
Primary.args = {
    primary: true,
    disabled: false,
    text: 'Button',
};

export const Secondary: Story = (args: ButtonProps) => <Button data-testId='InputField-id' {...args} />;
Secondary.args = {
    primary: false,
    disabled: false,
    text: 'Secondary',
};

export const Disabled: Story = (args: ButtonProps) => <Button data-testId='InputField-id' {...args} />;
Disabled.args = {
    primary: false,
    disabled: true,
    text: 'Disabled',
};

export const Small: Story = (args: ButtonProps) => <Button data-testId='InputField-id' {...args} />;
Small.args = {
    primary: true,
    disabled: false,
    size: 'small',
    text: 'Small',
};

export const Large: Story = (args: ButtonProps) => <Button data-testId='InputField-id' {...args} />;
Large.args = {
    primary: true,
    disabled: false,
    size: 'large',
    text: 'Large',
};
