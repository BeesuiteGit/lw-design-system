import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable, type PricingPlan } from './PricingTable';

const meta: Meta<typeof PricingTable> = {
  title: 'Layouts/PricingTable',
  component: PricingTable,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const threePlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 0,
    description: 'For individuals trying things out.',
    features: ['1 project', 'Community support', 'Basic analytics'],
    color: 'primary',
  },
  {
    name: 'Pro',
    price: 29,
    description: 'For teams shipping production work.',
    featured: true,
    features: ['Unlimited projects', 'Email support', 'Advanced analytics', 'Custom domain'],
    color: 'secondary',
  },
  {
    name: 'Enterprise',
    price: 99,
    description: 'For organizations with compliance needs.',
    features: ['Everything in Pro', 'SSO / SAML', 'SLA', 'Dedicated CSM'],
    color: 'accent',
  },
];

export const Default: Story = {
  args: { plans: threePlans },
};

export const TwoPlans: Story = {
  args: { plans: threePlans.slice(0, 2), title: 'Two simple plans', subtitle: 'Pick the one that fits.' },
};

export const NoFeaturedPlan: Story = {
  args: { plans: threePlans.map((p) => ({ ...p, featured: false })) },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <PricingTable plans={threePlans.slice(0, 1)} title="Single plan" subtitle="" />
      <PricingTable plans={threePlans.slice(0, 2)} title="Two plans" subtitle="" />
      <PricingTable plans={threePlans} title="Three plans" subtitle="" />
    </div>
  ),
};
