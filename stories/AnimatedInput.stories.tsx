import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedInput } from './AnimatedInput';

const meta: Meta<typeof AnimatedInput> = {
  title: 'Animation/AnimatedInput',
  component: AnimatedInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Email address', type: 'email' },
};

export const WithError: Story = {
  args: { label: 'Email address', type: 'email', error: 'Please enter a valid email' },
};

export const Success: Story = {
  args: { label: 'Email address', type: 'email', success: true, defaultValue: 'a@b.co' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, width: 320 }}>
      <AnimatedInput label="Default" />
      <AnimatedInput label="With error" error="Required" />
      <AnimatedInput label="Success" success defaultValue="hello" />
      <AnimatedInput label="Password" type="password" />
    </div>
  ),
};
