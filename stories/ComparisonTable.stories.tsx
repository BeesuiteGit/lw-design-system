import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ComparisonTable,
  type ComparisonProduct,
  type ComparisonFeature,
} from './ComparisonTable';

const meta: Meta<typeof ComparisonTable> = {
  title: 'Layouts/ComparisonTable',
  component: ComparisonTable,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const products: ComparisonProduct[] = [
  { id: 'free', name: 'Free', tagline: 'For solo tinkerers', ctaLabel: 'Start free', ctaHref: '#' },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For shipping teams',
    highlighted: true,
    ctaLabel: 'Upgrade',
    ctaHref: '#',
  },
  { id: 'ent', name: 'Enterprise', tagline: 'For organizations', ctaLabel: 'Contact us', ctaHref: '#' },
];

const features: ComparisonFeature[] = [
  { label: 'Projects', values: ['1', 'Unlimited', 'Unlimited'] },
  { label: 'Email support', values: [false, true, true] },
  { label: 'SSO / SAML', values: [false, false, true] },
  { label: 'SLA', hint: 'Uptime guarantee', values: [false, '99.9%', '99.99%'] },
  { label: 'Dedicated CSM', values: [false, false, true] },
  { label: 'Audit logs', values: [false, true, true] },
];

export const Default: Story = {
  args: { products, features, title: 'Compare plans', subtitle: 'Pick the one that fits your team.' },
};

export const NoHighlight: Story = {
  args: {
    ...Default.args,
    products: products.map((p) => ({ ...p, highlighted: false })),
  },
};

export const TwoProducts: Story = {
  args: {
    ...Default.args,
    products: products.slice(0, 2),
    features: features.map((f) => ({ ...f, values: f.values.slice(0, 2) })),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <ComparisonTable products={products.slice(0, 2)} features={features.map((f) => ({ ...f, values: f.values.slice(0, 2) }))} title="Two products" />
      <ComparisonTable products={products} features={features} title="Three products" />
    </div>
  ),
};
