import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type DataTableColumn } from './DataTable';

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  joined: string;
}

const data: User[] = [
  { id: 1, name: 'Alex Carter', email: 'alex@studio.io', role: 'Admin', joined: '2024-03-12' },
  { id: 2, name: 'Bella Chen', email: 'bella@studio.io', role: 'Editor', joined: '2024-05-02' },
  { id: 3, name: 'Carlos Diaz', email: 'carlos@studio.io', role: 'Viewer', joined: '2024-06-18' },
  { id: 4, name: 'Dani Ito', email: 'dani@studio.io', role: 'Editor', joined: '2024-08-04' },
  { id: 5, name: 'Eva Park', email: 'eva@studio.io', role: 'Admin', joined: '2024-09-22' },
  { id: 6, name: 'Finn Kerr', email: 'finn@studio.io', role: 'Viewer', joined: '2024-10-11' },
  { id: 7, name: 'Gia Olsen', email: 'gia@studio.io', role: 'Editor', joined: '2024-11-30' },
  { id: 8, name: 'Hugo Reyes', email: 'hugo@studio.io', role: 'Viewer', joined: '2025-01-08' },
  { id: 9, name: 'Ivy Sato', email: 'ivy@studio.io', role: 'Admin', joined: '2025-02-14' },
  { id: 10, name: 'Jin Park', email: 'jin@studio.io', role: 'Editor', joined: '2025-03-01' },
  { id: 11, name: 'Kai Lin', email: 'kai@studio.io', role: 'Viewer', joined: '2025-03-22' },
  { id: 12, name: 'Lena Reed', email: 'lena@studio.io', role: 'Editor', joined: '2025-04-09' },
];

const columns: DataTableColumn<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true, width: '120px' },
  { key: 'joined', label: 'Joined', sortable: true, width: '140px' },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Layouts/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: { columns, data },
};

export const Selectable: Story = {
  args: { columns, data, selectable: true },
};

export const Paginated: Story = {
  args: { columns, data, paginated: true, pageSize: 5 },
};

export const Empty: Story = {
  args: { columns, data: [] },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <DataTable columns={columns} data={data.slice(0, 5)} />
      <DataTable columns={columns} data={data} selectable paginated pageSize={5} />
    </div>
  ),
};
