import type { Meta, StoryObj } from '@storybook/react';
import MapFilters from './map-filters';

const meta = {
  title: 'Checkin/MapFilters',
  component: MapFilters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeFilter: {
      control: { type: 'select' },
      options: ['all', 'story', 'quest'],
    },
    onFilterChange: { action: 'onFilterChange' },
  },
} satisfies Meta<typeof MapFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeFilter: 'all',
    onFilterChange: () => {},
  },
};

export const StorySelected: Story = {
  args: {
    activeFilter: 'story',
    onFilterChange: () => {},
  },
};

export const QuestSelected: Story = {
  args: {
    activeFilter: 'quest',
    onFilterChange: () => {},
  },
};

export const WithCustomClass: Story = {
  args: {
    activeFilter: 'all',
    onFilterChange: () => {},
    className: 'max-w-md',
  },
};