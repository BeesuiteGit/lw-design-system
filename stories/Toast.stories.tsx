import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastContainer } from './Toast';
import { useToast } from '../hooks/useToast';

const meta: Meta<typeof Toast> = {
  title: 'Animation/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (): void => {};

export const Info: Story = {
  args: { message: 'Heads up — sync started.', type: 'info', duration: 0, onDismiss: noop },
};

export const Success: Story = {
  args: { message: 'Saved successfully', type: 'success', duration: 0, onDismiss: noop },
};

export const ErrorToast: Story = {
  args: { message: 'Something went wrong', type: 'error', duration: 0, onDismiss: noop },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      <Toast message="Info toast" type="info" duration={0} onDismiss={noop} />
      <Toast message="Success toast" type="success" duration={0} onDismiss={noop} />
      <Toast message="Warning toast" type="warning" duration={0} onDismiss={noop} />
      <Toast message="Error toast" type="error" duration={0} onDismiss={noop} />
    </div>
  ),
};

export const StackInteractive: Story = {
  render: () => {
    const { toasts, addToast, removeToast } = useToast();
    return (
      <div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => addToast('Info', 'info')}>Info</button>
          <button type="button" onClick={() => addToast('Saved!', 'success')}>Success</button>
          <button type="button" onClick={() => addToast('Heads up', 'warning')}>Warning</button>
          <button type="button" onClick={() => addToast('Failed', 'error')}>Error</button>
        </div>
        <ToastContainer
          toasts={toasts.map((t) => ({ ...t, onDismiss: () => removeToast(t.id) }))}
        />
      </div>
    );
  },
};
