import type { Meta, StoryObj } from '@storybook/react';
import CrewMemberCard from './crew-member-card';
import type { CrewInfoProps } from '@/types/about-type';

const meta: Meta<typeof CrewMemberCard> = {
  title: 'About/Crew/CrewMemberCard',
  component: CrewMemberCard,
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
    crewMember: {
      control: 'object',
      description: 'Crew member information object',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CrewMemberCard>;

const mockCrewMember: CrewInfoProps = {
  name: 'Hiroshi Tanaka',
  title: 'Lead Developer',
  description: 'Passionate about creating immersive digital experiences that bridge the gap between traditional culture and modern technology.',
  profileImage: '/image/about/crew/fc.jpg',
  twitterLink: 'https://twitter.com/hiroshi_dev',
  twiiterHandle: '@hiroshi_dev',
};

const mockCrewMemberLongDescription: CrewInfoProps = {
  name: 'Sakura Yamamoto',
  title: 'Creative Director & UI/UX Designer',
  description: 'With over 10 years of experience in digital design, Sakura specializes in creating intuitive user interfaces that seamlessly blend traditional Japanese aesthetics with contemporary design principles. Her work focuses on storytelling through visual design, ensuring every interaction feels meaningful and culturally authentic.',
  profileImage: '/image/about/crew/nakano.jpg',
  twitterLink: 'https://twitter.com/sakura_design',
  twiiterHandle: '@sakura_design',
};

const mockCrewMemberNoTwitter: CrewInfoProps = {
  name: 'Kenji Sato',
  title: 'Backend Engineer',
  description: 'Focused on building robust and scalable backend systems that power the Tourii platform.',
  profileImage: '/image/about/crew/sx.jpg',
  twitterLink: '',
  twiiterHandle: '',
};

export const Default: Story = {
  args: {
    crewMember: mockCrewMember,
  },
};

export const LongDescription: Story = {
  args: {
    crewMember: mockCrewMemberLongDescription,
  },
  parameters: {
    docs: {
      description: {
        story: 'Crew member card with a longer description to test text wrapping.',
      },
    },
  },
};

export const NoTwitter: Story = {
  args: {
    crewMember: mockCrewMemberNoTwitter,
  },
  parameters: {
    docs: {
      description: {
        story: 'Crew member card without Twitter link.',
      },
    },
  },
};

export const DifferentCrewMember: Story = {
  args: {
    crewMember: {
      name: 'Yuki Watanabe',
      title: 'Product Manager',
      description: 'Drives product strategy and ensures user needs are at the center of every decision.',
      profileImage: '/image/about/crew/yolk.jpg',
      twitterLink: 'https://twitter.com/yuki_pm',
      twiiterHandle: '@yuki_pm',
    },
  },
};