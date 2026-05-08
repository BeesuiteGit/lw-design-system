import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedButton } from './AnimatedButton';

const meta: Meta<typeof AnimatedButton> = {
  title: 'Animation/AnimatedButton',
  component: AnimatedButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'glass', 'secondary'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Get started', variant: 'primary' },
};

export const Glass: Story = {
  args: { children: 'Learn more', variant: 'glass' },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <AnimatedButton variant="primary">Primary</AnimatedButton>
      <AnimatedButton variant="secondary">Secondary</AnimatedButton>
      <AnimatedButton variant="glass">Glass</AnimatedButton>
      <AnimatedButton disabled>Disabled</AnimatedButton>
    </div>
  ),
};
