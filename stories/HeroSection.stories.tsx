import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Layouts/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Build something modern',
    subtitle: 'A short, specific value proposition that fits in two breaths.',
    ctaText: 'Get started',
    ctaLink: '#',
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    backgroundImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=70',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Single-line hero',
    ctaText: 'Continue',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <HeroSection title="Default hero" subtitle="With subtitle" ctaText="Go" />
      <HeroSection title="With background" subtitle="Image overlay" ctaText="Go"
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=70" />
      <HeroSection title="Just a title" ctaText="Continue" />
    </div>
  ),
};
