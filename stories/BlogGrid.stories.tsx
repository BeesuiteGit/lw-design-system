import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BlogGrid, type BlogArticle } from './BlogGrid';

const meta: Meta<typeof BlogGrid> = {
  title: 'Layouts/BlogGrid',
  component: BlogGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const articles: BlogArticle[] = [
  {
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800',
    category: 'Engineering',
    title: 'Shipping a design system in a month',
    excerpt: 'How we went from sketches to production with a 4-person team.',
    author: 'Lou',
    date: 'May 2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800',
    category: 'Product',
    title: 'Why we removed a third of our features',
    excerpt: 'Less surface area = clearer product = happier users.',
    author: 'Sam',
    date: 'May 2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800',
    category: 'Engineering',
    title: 'Edge functions in 12 cities',
    excerpt: 'Regional inference at sub-50ms p95 latency.',
    author: 'Pat',
    date: 'May 2026',
  },
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800',
    category: 'Design',
    title: 'On the discipline of restraint',
    excerpt: 'Three principles that keep our UI from drifting.',
    author: 'Ari',
    date: 'May 2026',
  },
];

export const Default: Story = {
  args: { articles },
};

export const SingleArticle: Story = {
  args: { articles: [articles[0]!] },
};

export const ManyArticles: Story = {
  args: { articles: [...articles, ...articles] },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <BlogGrid articles={[articles[0]!]} />
      <BlogGrid articles={articles.slice(0, 3)} />
      <BlogGrid articles={articles} />
    </div>
  ),
};
