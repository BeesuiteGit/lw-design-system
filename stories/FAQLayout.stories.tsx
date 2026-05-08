import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FAQLayout, type FAQItem } from './FAQLayout';

const meta: Meta<typeof FAQLayout> = {
  title: 'Layouts/FAQLayout',
  component: FAQLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const items: FAQItem[] = [
  {
    question: 'What is included in the free tier?',
    answer: 'One project, community support, and basic analytics. No credit card required.',
  },
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer: 'Yes — switch plans monthly. Prorated charges or credits are applied automatically.',
  },
  {
    question: 'Is there a self-hosted option?',
    answer: 'Self-hosting is available on the Enterprise plan. Reach out for deployment templates.',
  },
  {
    question: 'How is my data handled?',
    answer: 'All data is encrypted at rest with AES-256 and in transit via TLS 1.3. SOC 2 Type II report on request.',
  },
];

export const SingleOpen: Story = {
  args: { items, title: 'Frequently asked', subtitle: 'Cannot find an answer? Email us.' },
};

export const MultipleOpen: Story = {
  args: { items, allowMultipleOpen: true, defaultOpen: 0, title: 'Multi-open' },
};

export const AllClosed: Story = {
  args: { items, defaultOpen: -1, title: 'Start collapsed' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <FAQLayout items={items.slice(0, 2)} title="Two questions" />
      <FAQLayout items={items} title="Full FAQ" />
      <FAQLayout items={items} allowMultipleOpen title="Multi-open" />
    </div>
  ),
};
