import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollFadeSection } from './ScrollFadeSection';

const meta: Meta<typeof ScrollFadeSection> = {
  title: 'Animation/ScrollFadeSection',
  component: ScrollFadeSection,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Block = ({ label, color }: { label: string; color: string }): JSX.Element => (
  <div
    style={{
      minHeight: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: color,
      color: 'white',
      fontSize: 24,
      fontWeight: 700,
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  render: () => (
    <div>
      <Block label="Scroll down" color="#1e293b" />
      <ScrollFadeSection>
        <Block label="I fade in when visible" color="#0EA5E9" />
      </ScrollFadeSection>
    </div>
  ),
};

export const HighThreshold: Story = {
  render: () => (
    <div>
      <Block label="Scroll down" color="#1e293b" />
      <ScrollFadeSection threshold={0.6}>
        <Block label="Triggers later (60% visible)" color="#10B981" />
      </ScrollFadeSection>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div>
      <Block label="Scroll down" color="#1e293b" />
      <ScrollFadeSection threshold={0.1}>
        <Block label="threshold 0.1" color="#0EA5E9" />
      </ScrollFadeSection>
      <ScrollFadeSection threshold={0.4}>
        <Block label="threshold 0.4" color="#10B981" />
      </ScrollFadeSection>
      <ScrollFadeSection threshold={0.8}>
        <Block label="threshold 0.8" color="#F59E0B" />
      </ScrollFadeSection>
    </div>
  ),
};
