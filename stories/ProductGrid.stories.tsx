import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid, type Product } from './ProductGrid';

const meta: Meta<typeof ProductGrid> = {
  title: 'Layouts/ProductGrid',
  component: ProductGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const products: Product[] = [
  {
    id: 1,
    name: 'Linen shirt',
    price: 89,
    rating: 4.5,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600',
    badge: 'New',
  },
  {
    id: 2,
    name: 'Wool overcoat',
    price: 240,
    rating: 4.8,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600',
  },
  {
    id: 3,
    name: 'Canvas tote',
    price: 45,
    rating: 4,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600',
  },
  {
    id: 4,
    name: 'Leather boots',
    price: 180,
    rating: 4.7,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1542219550-37153d387c27?auto=format&fit=crop&w=600',
    badge: 'Sale',
  },
];

export const ThreeColumns: Story = {
  args: { products, columns: 3, onAddToCart: (p) => alert(`Added ${p.name}`) },
};

export const FourColumns: Story = {
  args: { products: [...products, ...products], columns: 4, onAddToCart: () => undefined },
};

export const NoRating: Story = {
  args: { products, showRating: false, onAddToCart: () => undefined },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <ProductGrid products={products} columns={2} />
      <ProductGrid products={products} columns={3} />
      <ProductGrid products={[...products, ...products]} columns={4} />
    </div>
  ),
};
