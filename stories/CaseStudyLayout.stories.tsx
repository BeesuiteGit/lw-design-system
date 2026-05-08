import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudyLayout, type RelatedCase, type TOCItem } from './CaseStudyLayout';

const meta: Meta<typeof CaseStudyLayout> = {
  title: 'Layouts/CaseStudyLayout',
  component: CaseStudyLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Body = (): JSX.Element => (
  <>
    <h2 id="context">Context</h2>
    <p>
      The team had spent eight months in spec-mode. Three competing design systems. Zero shipping
      cadence. Customers were quietly leaving. Something had to give.
    </p>
    <h2 id="approach">Approach</h2>
    <p>
      We picked one of the three systems, declared a 30-day moratorium on adding new components, and
      rebuilt the four highest-traffic pages on top of it.
    </p>
    <blockquote>
      Constraint is the only honest design tool. Everything else is taste.
    </blockquote>
    <h2 id="outcome">Outcome</h2>
    <p>
      Activation rose 18 percent. Time-to-first-deploy fell from 11 days to 38 minutes. Two of the
      remaining systems were retired the following quarter.
    </p>
  </>
);

const toc: TOCItem[] = [
  { id: 'context', label: 'Context' },
  { id: 'approach', label: 'Approach' },
  { id: 'outcome', label: 'Outcome' },
];

const related: RelatedCase[] = [
  {
    title: 'Killing the kitchen-sink config',
    href: '#',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800',
    excerpt: 'How we collapsed 23 settings into 4 sensible defaults.',
  },
  {
    title: 'A design audit on a one-week budget',
    href: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800',
    excerpt: 'Five rules, one Figma file, no committee.',
  },
  {
    title: 'When to hand-code over generation',
    href: '#',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800',
    excerpt: 'A small taxonomy for picking the right tool.',
  },
];

export const Default: Story = {
  args: {
    title: 'How we shipped a design system in 30 days',
    subtitle: 'A story about constraint, taste, and the discipline of saying no.',
    featuredImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600',
    content: <Body />,
    author: 'Lou Weiss',
    date: 'May 8, 2026',
    readTime: 7,
    toc,
    relatedCases: related,
  },
};

export const NoTOC: Story = {
  args: { ...Default.args, toc: undefined },
};

export const NoRelated: Story = {
  args: { ...Default.args, relatedCases: undefined },
};

export const Minimal: Story = {
  args: {
    title: 'Minimal case study',
    subtitle: 'Just a headline and a body.',
    featuredImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600',
    content: <p>A short article body without TOC or related cards.</p>,
  },
};
