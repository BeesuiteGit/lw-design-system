import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimelineLayout, type TimelineEvent } from './TimelineLayout';

const meta: Meta<typeof TimelineLayout> = {
  title: 'Layouts/TimelineLayout',
  component: TimelineLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const events: TimelineEvent[] = [
  {
    date: '2022',
    title: 'Founded',
    description: 'Three engineers and a coffee machine. First MVP shipped from a borrowed garage.',
  },
  {
    date: '2023 Q2',
    title: 'Seed round',
    description: 'Raised $1.8M from a small set of operator-investors who actually use the product.',
  },
  {
    date: '2024 Q1',
    title: '10,000 users',
    description: 'Crossed the first meaningful adoption milestone six months ahead of plan.',
  },
  {
    date: '2025',
    title: 'Series A',
    description: 'Closed a $14M Series A and opened the EU office.',
  },
  {
    date: '2026',
    title: 'Today',
    description: 'A 38-person team across three continents, shipping every weekday.',
  },
];

export const Vertical: Story = {
  args: { events, orientation: 'vertical', title: 'Our story', subtitle: 'A short timeline.' },
};

export const Horizontal: Story = {
  args: { events, orientation: 'horizontal', title: 'Roadmap' },
};

export const ShortTimeline: Story = {
  args: { events: events.slice(0, 3), orientation: 'vertical' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <TimelineLayout events={events} orientation="vertical" title="Vertical" />
      <TimelineLayout events={events} orientation="horizontal" title="Horizontal" />
    </div>
  ),
};
