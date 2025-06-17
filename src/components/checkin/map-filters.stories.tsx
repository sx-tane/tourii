import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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
  },
} satisfies Meta<typeof MapFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeFilter: 'all',
    onFilterChange: action('onFilterChange'),
  },
};

export const StorySelected: Story = {
  args: {
    activeFilter: 'story',
    onFilterChange: action('onFilterChange'),
  },
};

export const QuestSelected: Story = {
  args: {
    activeFilter: 'quest',
    onFilterChange: action('onFilterChange'),
  },
};

export const WithCustomClass: Story = {
  args: {
    activeFilter: 'all',
    onFilterChange: action('onFilterChange'),
    className: 'max-w-md',
  },
};