import type { Meta, StoryObj } from '@storybook/react';
import { ClientOnly } from './client-only';

const meta: Meta<typeof ClientOnly> = {
  title: 'Common/ClientOnly',
  component: ClientOnly,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Content to render only on the client side',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClientOnly>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4 bg-blue-100 rounded border">
        <h3 className="font-bold text-blue-800">Client-Side Only Content</h3>
        <p className="text-blue-600">This content only renders after hydration</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Wrapper that prevents hydration mismatches by only rendering children on the client.',
      },
    },
  },
};

export const WithInteractiveContent: Story = {
  args: {
    children: (
      <div className="p-4 bg-green-100 rounded border">
        <h3 className="font-bold text-green-800">Interactive Component</h3>
        <button 
          className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => alert('Client-side interaction!')}
        >
          Click Me
        </button>
        <p className="text-green-600 text-sm mt-2">
          Date: {new Date().toLocaleString()}
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'ClientOnly wrapper with interactive content that needs client-side JavaScript.',
      },
    },
  },
};

export const WithMapComponent: Story = {
  args: {
    children: (
      <div className="p-4 bg-yellow-100 rounded border">
        <h3 className="font-bold text-yellow-800">Map Placeholder</h3>
        <div className="w-64 h-32 bg-yellow-200 rounded mt-2 flex items-center justify-center">
          <span className="text-yellow-700">🗺️ Map would load here</span>
        </div>
        <p className="text-yellow-600 text-sm mt-2">
          Used for client-only components like maps or charts
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of using ClientOnly for components that require window object or browser APIs.',
      },
    },
  },
};