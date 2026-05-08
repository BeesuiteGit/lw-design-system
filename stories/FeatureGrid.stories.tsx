import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid, type Feature } from './FeatureGrid';

const meta: Meta<typeof FeatureGrid> = {
  title: 'Layouts/FeatureGrid',
  component: FeatureGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sample: Feature[] = [
  { icon: 'A', title: 'Fast', description: 'Sub-second response on every endpoint.' },
  { icon: 'B', title: 'Secure', description: 'SOC2 Type II compliant, end-to-end encrypted.' },
  { icon: 'C', title: 'Global', description: 'Edge in 30 cities, sub-50ms TTFB worldwide.' },
];

export const Default: Story = {
  args: { features: sample, title: 'Why teams choose us', subtitle: 'Three reasons, no filler.' },
};

export const NoHeader: Story = {
  args: { features: sample },
};

export const SixFeatures: Story = {
  args: {
    title: 'Everything you need',
    features: [
      ...sample,
      { icon: 'D', title: 'Open API', description: 'REST + GraphQL, no rate limits on paid tiers.' },
      { icon: 'E', title: 'SDKs', description: 'JS, Python, Go, Ruby, Swift, Kotlin.' },
      { icon: 'F', title: 'Support', description: '24/7 human support on all paid plans.' },
    ],
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <FeatureGrid title="Two features" features={sample.slice(0, 2)} />
      <FeatureGrid title="Three features" features={sample} />
    </div>
  ),
};
