import type { Meta, StoryObj } from '@storybook/react';
import CharacterList from './character-list';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { characters } from '@/lib/data/character/character-data';
import characterReducer from '@/lib/redux/features/character/character-slice';

// Create a mock store with initial state
const mockStore = configureStore({
    reducer: {
        character: characterReducer,
    },
    preloadedState: {
        character: {
            characters,
            selectedCharacter: null,
            isLoading: false,
            error: null,
            filters: {
                searchQuery: '',
                realm: ''
            }
        }
    }
});

const meta = {
    title: 'Character/CharacterList',
    component: CharacterList,
    parameters: {
        layout: 'padded',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
    decorators: [
        (Story) => (
            <Provider store={mockStore}>
                <Story />
            </Provider>
        ),
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof CharacterList>;

export default meta;
type Story = StoryObj<typeof CharacterList>;

export const Default: Story = {};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile'
        }
    }
};

export const Tablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'tablet'
        }
    }
}; 