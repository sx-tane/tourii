import type { Meta, StoryObj } from '@storybook/react';
import IPhone from './iphone';

const meta = {
    title: 'Homepage/IPhone',
    component: IPhone,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof IPhone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <div className="w-64 h-auto" />,
    },
}; 