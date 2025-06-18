import type { Meta, StoryObj } from '@storybook/react';
import { MomentCard } from './moment-card';

const meta: Meta<typeof MomentCard> = {
  title: 'Dashboard/MomentCard',
  component: MomentCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MomentCard>;

const baseMoment = {
  imageUrl: '/image/model-route/1/miyazaki/1.jpg',
  username: 'TravelExplorer',
  description: 'Just visited this amazing shrine in Miyazaki! The architecture is breathtaking and the peaceful atmosphere made it perfect for meditation.',
  rewardText: 'Earned 50 Tourii Points',
  insDateTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
};

export const Default: Story = {
  args: {
    moment: baseMoment,
  },
};

export const WithBadgeReward: Story = {
  args: {
    moment: {
      ...baseMoment,
      rewardText: 'Earned Temple Visitor Badge',
      description: 'Completed the temple visit quest. Such a peaceful experience!',
    },
  },
};

export const NoImage: Story = {
  args: {
    moment: {
      ...baseMoment,
      imageUrl: null,
      description: 'Shared a moment without a photo - sometimes words are enough!',
    },
  },
};

export const LongDescription: Story = {
  args: {
    moment: {
      ...baseMoment,
      description: 'This was absolutely incredible! The shrine has such rich history dating back centuries. I spent hours here learning about the local traditions and taking in the serene atmosphere. The gardens are particularly beautiful this time of year with cherry blossoms in full bloom.',
    },
  },
};

export const NoReward: Story = {
  args: {
    moment: {
      ...baseMoment,
      rewardText: null,
      description: 'Just sharing this beautiful view with everyone!',
    },
  },
};

export const AnonymousUser: Story = {
  args: {
    moment: {
      ...baseMoment,
      username: null,
      description: 'An anonymous traveler shared this moment.',
    },
  },
};

export const JustNow: Story = {
  args: {
    moment: {
      ...baseMoment,
      insDateTime: new Date().toISOString(),
      description: 'This moment was just shared!',
    },
  },
};

export const OldMoment: Story = {
  args: {
    moment: {
      ...baseMoment,
      insDateTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      description: 'A memory from last month.',
    },
  },
};