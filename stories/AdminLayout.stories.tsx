import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AdminLayout } from './AdminLayout';

const meta: Meta<typeof AdminLayout> = {
  title: 'Layouts/AdminLayout',
  component: AdminLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Sidebar = (): JSX.Element => (
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 4 }}>
    {['Dashboard', 'Users', 'Projects', 'Settings', 'Billing'].map((item) => (
      <li key={item}>
        <a
          href="#"
          style={{
            display: 'block',
            padding: '10px 12px',
            borderRadius: 8,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {item}
        </a>
      </li>
    ))}
  </ul>
);

const Topbar = (): JSX.Element => (
  <>
    <input
      placeholder="Search..."
      style={{
        flex: 1,
        maxWidth: 400,
        padding: '8px 12px',
        background: 'var(--color-bg-secondary, #1e293b)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 8,
        color: 'inherit',
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span>3 alerts</span>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0EA5E9, #10B981)',
        }}
      />
    </div>
  </>
);

const Content = (): JSX.Element => (
  <div>
    <h1>Welcome back</h1>
    <p>Pick up where you left off, or create something new.</p>
  </div>
);

export const Default: Story = {
  args: { sidebar: <Sidebar />, topbar: <Topbar />, brand: 'Studio', children: <Content /> },
};

export const Collapsed: Story = {
  args: { ...Default.args, sidebarOpen: false },
};

export const NoSidebar: Story = {
  args: { topbar: <Topbar />, children: <Content /> },
};
