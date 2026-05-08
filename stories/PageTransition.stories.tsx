import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageTransition } from './PageTransition';

const meta: Meta<typeof PageTransition> = {
  title: 'Animation/PageTransition',
  component: PageTransition,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Slate = ({ label }: { label: string }): JSX.Element => (
  <div
    style={{
      minHeight: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 48,
      background: 'linear-gradient(135deg, #0EA5E9, #10B981)',
      color: 'white',
      fontSize: 28,
      fontWeight: 700,
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  args: { children: <Slate label="Mounted page" /> },
};

export const Delayed: Story = {
  args: { delay: 0.4, children: <Slate label="Delayed entrance" /> },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <PageTransition>
        <Slate label="No delay" />
      </PageTransition>
      <PageTransition delay={0.2}>
        <Slate label="Delay 0.2s" />
      </PageTransition>
      <PageTransition delay={0.5}>
        <Slate label="Delay 0.5s" />
      </PageTransition>
    </div>
  ),
};
