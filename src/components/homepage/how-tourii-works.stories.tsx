import type { Meta, StoryObj } from '@storybook/react';
import HowTouriiWorks from './how-tourii-works';
import { useRef, useState } from 'react';

const meta = {
    title: 'Homepage/HowTouriiWorks',
    component: HowTouriiWorks,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'light',
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof HowTouriiWorks>;

export default meta;
type Story = StoryObj<typeof HowTouriiWorks>;

const sections = [
    {
        title: 'STEP 1',
        subtitle: 'DISCOVER',
        description: 'Find your perfect destination',
        image: '/images/discover.jpg'
    },
    {
        title: 'STEP 2',
        subtitle: 'PLAN',
        description: 'Create your itinerary',
        image: '/images/plan.jpg'
    },
    {
        title: 'STEP 3',
        subtitle: 'EXPLORE',
        description: 'Experience your journey',
        image: '/images/explore.jpg'
    }
];

const HowTouriiWorksWrapper = () => {
    const [currentImage, setCurrentImage] = useState(sections[0]?.image || '');
    const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

    return (
        <HowTouriiWorks
            sections={sections}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            sectionRefs={sectionRefs}
        />
    );
};

export const Default: Story = {
    render: () => <HowTouriiWorksWrapper />,
    args: {} // Empty args since we're using render function
}; 