import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedList, type AnimatedListProps } from './AnimatedList';

// Storybook needs a concrete (non-generic) component reference for `Meta`.
// We instantiate the generic at `string` here so the rest of the file
// types cleanly. This is the recommended pattern for generic components
// (https://storybook.js.org/docs/writing-stories/typescript) — `typeof X<T>`
// is not valid TypeScript when X is a value.
const AnimatedListString: React.FC<AnimatedListProps<string>> = AnimatedList;

const meta: Meta<typeof AnimatedListString> = {
  title: 'Animation/AnimatedList',
  component: AnimatedListString,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnimatedListString>;

const items = ['Discover', 'Build', 'Iterate', 'Ship', 'Measure'];

const renderItem = (label: string): JSX.Element => (
  <div
    style={{
      padding: 16,
      marginBottom: 8,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8,
      color: 'white',
      width: 320,
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  args: { items, renderItem },
};

export const Delayed: Story = {
  args: { items, renderItem, delay: 0.5 },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <div>
        <h4 style={{ color: 'white', margin: '0 0 8px' }}>Default</h4>
        <AnimatedList<string> items={items} renderItem={renderItem} />
      </div>
      <div>
        <h4 style={{ color: 'white', margin: '0 0 8px' }}>Delay 0.3s</h4>
        <AnimatedList<string> items={items} renderItem={renderItem} delay={0.3} />
      </div>
    </div>
  ),
};
