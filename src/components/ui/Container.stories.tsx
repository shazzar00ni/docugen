import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta = {
  title: 'UI/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container>
      <div className="bg-slate-800 p-4 rounded text-white">Container content</div>
    </Container>
  ),
};

export const WithCustomClass: Story = {
  render: () => (
    <Container className="py-8">
      <div className="bg-slate-800 p-4 rounded text-white">Container with custom class</div>
    </Container>
  ),
};

export const GridExample: Story = {
  render: () => (
    <Container>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-teal-600 p-4 rounded text-white">Item 1</div>
        <div className="bg-teal-600 p-4 rounded text-white">Item 2</div>
        <div className="bg-teal-600 p-4 rounded text-white">Item 3</div>
      </div>
    </Container>
  ),
};
