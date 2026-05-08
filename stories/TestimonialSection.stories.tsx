import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialSection, type Testimonial } from './TestimonialSection';

const meta: Meta<typeof TestimonialSection> = {
  title: 'Layouts/TestimonialSection',
  component: TestimonialSection,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const testimonials: Testimonial[] = [
  {
    quote: 'We shipped our redesign in two weeks instead of two months. The components feel polished out of the box.',
    author: 'Alex Carter',
    role: 'Head of Design, Studio',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=12',
  },
  {
    quote: 'The accessibility defaults alone saved our team a full audit cycle.',
    author: 'Bella Chen',
    role: 'Engineering Lead, Fabric',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=22',
  },
  {
    quote: 'Glass surfaces actually look good. I have never said that about a UI library before.',
    author: 'Carlos Diaz',
    role: 'Founder, Halo',
    rating: 4,
    avatar: 'https://i.pravatar.cc/120?img=32',
  },
];

export const Cards: Story = {
  args: { testimonials, style: 'cards', title: 'Loved by teams', subtitle: 'A few words from people we work with.' },
};

export const Carousel: Story = {
  args: { testimonials, style: 'carousel', autoPlay: true, title: 'What customers say' },
};

export const List: Story = {
  args: { testimonials, style: 'list', title: 'Testimonials' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <TestimonialSection testimonials={testimonials} style="cards" title="Cards" />
      <TestimonialSection testimonials={testimonials} style="list" title="List" />
      <TestimonialSection testimonials={testimonials} style="carousel" title="Carousel" />
    </div>
  ),
};
