# Tourii Frontend

<p align="center">
  <img src="public/logo.png" width="200" alt="Tourii Logo" />
</p>

<p align="center">Explore, Earn, and Connect through Story-Driven Tourism</p>

## Description

Tourii is a Web3-integrated tourism platform that combines storytelling, quests, and digital rewards to create immersive travel experiences. This repository contains the frontend application built with Next.js, offering users a seamless interface to explore locations through stories, complete quests, and earn digital rewards.

## Core Features

1. **Story-Driven Tourism**
   - Interactive story sagas
   - Location-based chapters
   - Character profiles
   - Rich media content

2. **Quest System**
   - Online/offline quests
   - Location verification
   - Photo submissions
   - Group activities

3. **Digital Rewards**
   - NFT digital passports
   - Achievement badges
   - Travel perks
   - Point system

4. **Social Features**
   - Memory wall
   - Quest sharing
   - Achievement showcase
   - Community interaction

## Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com)
  - [Framer Motion](https://www.framer.com/motion)
- **State Management**: 
  - [Redux Toolkit](https://redux-toolkit.js.org)
  - [React Query](https://tanstack.com/query)
- **Web3 Integration**:
  - [ethers.js](https://docs.ethers.org)
  - [Web3Modal](https://web3modal.com)
- **Maps & Location**:
  - [Mapbox](https://www.mapbox.com)
  - [React Map GL](https://visgl.github.io/react-map-gl)
- **Media Handling**:
  - [IPFS](https://ipfs.io)
  - [NFT.Storage](https://nft.storage)

## Project Structure

```
tourii/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (story)/           # Story system routes
│   │   ├── (quest)/           # Quest system routes
│   │   └── (profile)/         # User profile routes
│   ├── components/            # Reusable components
│   │   ├── auth/             # Authentication components
│   │   ├── story/            # Story-related components
│   │   ├── quest/            # Quest-related components
│   │   └── shared/           # Shared UI components
│   ├── lib/                   # Utility functions
│   │   ├── api/              # API client setup
│   │   ├── blockchain/       # Web3 utilities
│   │   └── hooks/            # Custom React hooks
│   ├── store/                # Redux store setup
│   └── types/                # TypeScript definitions
├── public/                   # Static assets
└── contracts/               # Smart contract ABIs
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (recommended)
- MetaMask or other Web3 wallet

### Installation

```bash
# Install dependencies
$ pnpm install

# Set up environment variables
$ cp .env.example .env.local

# Start development server
$ pnpm dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WALLET_CONNECT_ID=your_wallet_connect_id
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_NFT_STORAGE_KEY=your_nft_storage_key
```

## Development

### Available Scripts

```bash
# Development
$ pnpm dev

# Build
$ pnpm build

# Production
$ pnpm start

# Testing
$ pnpm test

# Linting
$ pnpm lint
```

### Code Style

- ESLint configuration
- Prettier setup
- Husky pre-commit hooks
- Conventional commits

## Features Implementation

### Authentication Flow

1. Social login (Discord, Twitter, Google)
2. Web3 wallet connection
3. Digital passport minting
4. Session management

### Story System

1. Saga selection
2. Chapter progression
3. Location integration
4. Media handling

### Quest System

1. Quest discovery
2. Task completion
3. Reward distribution
4. Progress tracking

### Digital Assets

1. NFT passport management
2. Achievement tracking
3. Reward redemption
4. Transaction history

## Testing

### Unit Tests

```bash
# Run unit tests
$ pnpm test:unit

# Run with coverage
$ pnpm test:coverage
```

### E2E Tests

```bash
# Run E2E tests
$ pnpm test:e2e

# Run in UI mode
$ pnpm test:e2e:ui
```

## Deployment

### Production Build

```bash
# Build for production
$ pnpm build

# Start production server
$ pnpm start
```

### Deployment Checklist

1. Environment variables
2. Build optimization
3. Performance testing
4. Security checks

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is [MIT licensed](LICENSE).

## Contact

For more information, please contact the Tourii development team.