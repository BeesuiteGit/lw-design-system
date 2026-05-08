import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormLayout, type FormStep } from './FormLayout';

const meta: Meta<typeof FormLayout> = {
  title: 'Layouts/FormLayout',
  component: FormLayout,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const steps: FormStep[] = [
  {
    title: 'About you',
    description: 'A few basics so we can personalize your experience.',
    fields: [
      { name: 'name', label: 'Full name', required: true, placeholder: 'Lou Weiss' },
      { name: 'email', label: 'Email', type: 'email', required: true },
    ],
  },
  {
    title: 'Your project',
    description: 'Tell us what you are building.',
    fields: [
      {
        name: 'projectType',
        label: 'Project type',
        type: 'select',
        required: true,
        options: [
          { value: 'saas', label: 'SaaS' },
          { value: 'ecommerce', label: 'E-commerce' },
          { value: 'portfolio', label: 'Portfolio' },
        ],
      },
      { name: 'description', label: 'Short description', type: 'textarea', required: true },
    ],
  },
  {
    title: 'Confirm',
    description: 'Review and submit.',
    fields: [
      { name: 'consent', label: 'I agree to the terms', required: true, placeholder: 'type yes' },
    ],
  },
];

export const ThreeSteps: Story = {
  args: { steps, onSubmit: (d) => alert(JSON.stringify(d, null, 2)) },
};

export const SingleStep: Story = {
  args: { steps: [steps[0]!], onSubmit: () => undefined },
};

export const NoProgressBar: Story = {
  args: { steps, showProgress: false, onSubmit: () => undefined },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <FormLayout steps={[steps[0]!]} onSubmit={() => undefined} />
      <FormLayout steps={steps.slice(0, 2)} onSubmit={() => undefined} />
      <FormLayout steps={steps} onSubmit={() => undefined} />
    </div>
  ),
};
