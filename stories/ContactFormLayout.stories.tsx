import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContactFormLayout } from './ContactFormLayout';

const meta: Meta<typeof ContactFormLayout> = {
  title: 'Layouts/ContactFormLayout',
  component: ContactFormLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onSubmit: (d) => alert(JSON.stringify(d, null, 2)) },
};

export const WithPhone: Story = {
  args: { includePhone: true, onSubmit: () => undefined },
};

export const NoSubject: Story = {
  args: { includeSubject: false, onSubmit: () => undefined },
};

export const CustomCopy: Story = {
  args: {
    title: 'Tell us about your project',
    subtitle: 'A few sentences is enough — we will follow up with the right person.',
    submitLabel: 'Send brief',
    successMessage: 'Brief received. Talk soon.',
    onSubmit: () => undefined,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <ContactFormLayout onSubmit={() => undefined} />
      <ContactFormLayout includePhone onSubmit={() => undefined} title="With phone" />
      <ContactFormLayout includeSubject={false} onSubmit={() => undefined} title="Without subject" />
    </div>
  ),
};
