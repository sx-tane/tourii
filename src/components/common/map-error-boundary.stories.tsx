import type { Meta, StoryObj } from '@storybook/react';
import MapErrorBoundary from './map-error-boundary';
import { useState } from 'react';

const meta: Meta<typeof MapErrorBoundary> = {
  title: 'Common/MapErrorBoundary',
  component: MapErrorBoundary,
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
      description: 'Child components that might throw errors',
    },
    fallback: {
      control: false,
      description: 'Custom fallback component to render on error',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96 h-64">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MapErrorBoundary>;

// Component that works normally
const WorkingMapComponent = () => (
  <div className="h-full w-full bg-green-100 border border-green-300 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl mb-2">🗺️</div>
      <h3 className="text-green-800 font-semibold">Map Loaded Successfully</h3>
      <p className="text-green-600 text-sm">Everything is working fine!</p>
    </div>
  </div>
);

// Component that throws an error
const BrokenMapComponent = () => {
  throw new Error('Map failed to load: Network timeout');
};

// Component that throws an error on interaction
const ConditionalErrorComponent = () => {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error('User triggered map error');
  }
  
  return (
    <div className="h-full w-full bg-blue-100 border border-blue-300 rounded-lg flex flex-col items-center justify-center p-4">
      <div className="text-4xl mb-2">🗺️</div>
      <h3 className="text-blue-800 font-semibold mb-2">Interactive Map</h3>
      <button 
        onClick={() => setShouldError(true)}
        className="px-4 py-2 bg-red text-white rounded hover:bg-red/90"
      >
        Trigger Error
      </button>
    </div>
  );
};

const CustomErrorFallback = ({ error }: { error?: Error }) => (
  <div className="h-full w-full bg-purple-100 border border-purple-300 rounded-lg flex flex-col items-center justify-center p-4">
    <div className="text-4xl mb-2">🚫</div>
    <h3 className="text-purple-800 font-semibold">Custom Error UI</h3>
    <p className="text-purple-600 text-sm text-center">
      Custom fallback component for map errors
    </p>
    {error && (
      <p className="text-purple-500 text-xs mt-2">
        Error: {error.message}
      </p>
    )}
  </div>
);

export const WorkingMap: Story = {
  args: {
    children: <WorkingMapComponent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Map error boundary with a working map component.',
      },
    },
  },
};

export const DefaultErrorFallback: Story = {
  args: {
    children: <BrokenMapComponent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Map error boundary showing the default error fallback UI when a map component throws an error.',
      },
    },
  },
};

export const CustomErrorFallback: Story = {
  args: {
    children: <BrokenMapComponent />,
    fallback: CustomErrorFallback,
  },
  parameters: {
    docs: {
      description: {
        story: 'Map error boundary with a custom error fallback component.',
      },
    },
  },
};

export const InteractiveError: Story = {
  args: {
    children: <ConditionalErrorComponent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the button to trigger an error and see the error boundary in action.',
      },
    },
  },
};