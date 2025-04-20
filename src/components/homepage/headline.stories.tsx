import type { Meta, StoryObj } from '@storybook/react';
import Headline from './headline';

const meta = {
    title: 'Homepage/Headline',
    component: Headline,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Headline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}; 