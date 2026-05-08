import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout, type DashboardWidget } from './DashboardLayout';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Layouts/DashboardLayout',
  component: DashboardLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Stat = ({ value, label }: { value: string; label: string }): JSX.Element => (
  <div>
    <div style={{ fontSize: 36, fontWeight: 700 }}>{value}</div>
    <div style={{ color: 'var(--color-text-secondary, #94a3b8)' }}>{label}</div>
  </div>
);

const widgets: DashboardWidget[] = [
  { title: 'Revenue', span: 2, color: 'primary', content: <Stat value="$48,210" label="This month" /> },
  { title: 'Active users', color: 'secondary', content: <Stat value="3,241" label="Last 7 days" /> },
  { title: 'Open tickets', color: 'accent', content: <Stat value="12" label="Needs response" /> },
  { title: 'Recent activity', span: 2, content: <p style={{ margin: 0 }}>3 deploys today, 1 rollback, 2 feature flags toggled.</p> },
  { title: 'Settings', content: <p style={{ margin: 0 }}>Configure notifications, billing, and team access.</p> },
];

export const Default: Story = { args: { widgets } };

export const FewWidgets: Story = {
  args: { widgets: widgets.slice(0, 3) },
};

export const ManyWidgets: Story = {
  args: { widgets: [...widgets, ...widgets] },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <DashboardLayout widgets={widgets.slice(0, 3)} />
      <DashboardLayout widgets={widgets} />
    </div>
  ),
};
