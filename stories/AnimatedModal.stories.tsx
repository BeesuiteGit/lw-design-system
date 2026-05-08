import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedModal } from './AnimatedModal';

const meta: Meta<typeof AnimatedModal> = {
  title: 'Animation/AnimatedModal',
  component: AnimatedModal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = ({ title, children }: { title?: string; children: React.ReactNode }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: '12px 24px',
          background: '#0EA5E9',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        Open modal
      </button>
      <AnimatedModal isOpen={open} onClose={() => setOpen(false)} title={title}>
        {children}
      </AnimatedModal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalDemo title="Confirm action">
      <p>Are you sure you want to proceed?</p>
    </ModalDemo>
  ),
};

export const Untitled: Story = {
  render: () => (
    <ModalDemo>
      <p>A modal without a header bar.</p>
    </ModalDemo>
  ),
};

export const RichContent: Story = {
  render: () => (
    <ModalDemo title="Edit profile">
      <div style={{ display: 'grid', gap: 12 }}>
        <input placeholder="Name" style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
        <input placeholder="Email" style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6 }} />
        <button type="button" style={{ padding: 10, background: '#0EA5E9', color: 'white', border: 'none', borderRadius: 6 }}>
          Save
        </button>
      </div>
    </ModalDemo>
  ),
};
