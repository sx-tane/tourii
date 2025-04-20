import type { Meta, StoryObj } from '@storybook/react';
import CharacterCard from './character-card';
import { characters } from '@/lib/data/character/character-data';

const meta = {
    title: 'Character/CharacterCard',
    component: CharacterCard,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
    },
    argTypes: {
        id: {
            control: 'text',
            description: 'Character ID'
        },
        name: {
            control: 'text',
            description: 'Character name in English'
        },
        kanjiname: {
            control: 'text',
            description: 'Character name in Kanji'
        },
        thumbnailImage: {
            control: 'text',
            description: 'URL of the character thumbnail image'
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when card is clicked'
        }
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
} satisfies Meta<typeof CharacterCard>;

export default meta;
type Story = StoryObj<typeof CharacterCard>;

export const Default: Story = {
    args: {
        ...characters[0]
    }
};

export const WithHover: Story = {
    args: {
        ...characters[0]
    },
    parameters: {
        pseudo: { hover: true }
    }
};

export const WithLongName: Story = {
    args: {
        ...characters[1]
    }
}; 