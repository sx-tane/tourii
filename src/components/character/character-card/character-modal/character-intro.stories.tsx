import type { Meta, StoryObj } from '@storybook/react';
import CharacterIntro from './character-intro';
import CharacterIntroMobile from './character-intro-mobile';
import { characters } from '@/lib/data/character/character-data';

const introMeta = {
    title: 'Character/Modal/CharacterIntro',
    component: CharacterIntro,
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
    argTypes: {
        onNext: { action: 'next clicked' },
        onPrevious: { action: 'previous clicked' }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CharacterIntro>;

export default introMeta;
type Story = StoryObj<typeof CharacterIntro>;

export const Desktop: Story = {
    args: {
        character: characters[0]
    }
};

export const DesktopSecondCharacter: Story = {
    args: {
        character: characters[1]
    }
};

const mobileIntroMeta = {
    title: 'Character/Modal/CharacterIntroMobile',
    component: CharacterIntroMobile,
    parameters: {
        layout: 'padded',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#E3E3DC' }, // warmGrey
                { name: 'dark', value: '#21211B' }, // charcoal
            ],
        },
        viewport: {
            defaultViewport: 'mobile'
        }
    },
    argTypes: {
        onNext: { action: 'next clicked' },
        onPrevious: { action: 'previous clicked' }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CharacterIntroMobile>;

export const Mobile: Story = {
    args: {
        character: characters[0]
    }
};

export const MobileSecondCharacter: Story = {
    args: {
        character: characters[1]
    }
}; 