# Tourii Frontend

<p align="center">
  <a href="https://github.com/your-organization/tourii-frontend" target="blank"><img src="https://yourapp.com/logo.png" width="200" alt="Tourii Logo" /></a>
</p>

<p align="center">Tourii Frontend - An immersive, story-driven travel experience platform</p>

## Description

Tourii is a comprehensive platform that connects travelers with immersive, story-driven travel experiences. This repository contains the frontend application for Tourii, built with Next.js and the T3 Stack, providing users with a rich, interactive interface to explore tourist spots through narrative-driven routes, complete quests, earn rewards, and interact with blockchain assets.

The frontend offers a gamified experience that bridges the physical world of travel with digital engagement, bringing Japanese cultural elements and storytelling to life through modern web technologies.

## Features

- **Immersive Storytelling Interface**: Engage with rich, narrative-driven content that guides tourism experiences
- **Interactive Model Routes**: Explore curated travel routes with detailed tourist spot information and media
- **Character Profiles**: Discover and learn about characters from Japanese folklore and mythology
- **User Profile System**: Manage personal details, travel history, and digital collectibles
- **NFT Integration**: View and interact with blockchain assets including digital travel perks
- **Responsive Design**: Fully optimized experience across desktop and mobile devices

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) - React framework with server-side rendering and static generation
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with custom theming and animations
- **UI Components**: Custom component library with Headless UI and Radix UI integration
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid transitions and micro-interactions
- **State Management**: React Context API and hooks-based state management
- **Data Fetching**: Server components and API routes for data manipulation
- **Typography**: Custom font integration including Montserrat and Noto Serif JP
- **Code Quality**: Biome for linting and formatting

## Project Structure

The project follows a feature-based organization with clear separation of concerns:

```
tourii/
├── src/
│   ├── app/                   # Next.js app router structure
│   │   ├── (homepage)/        # Homepage routes and layouts
│   │   ├── (info)/            # Informational pages (about, world)
│   │   ├── (story)/           # Touriiverse story routes
│   │   ├── model-route/       # Model route pages
│   │   └── profile-dev/       # User profile pages
│   ├── components/            # Reusable UI components
│   │   ├── about/             # About page components
│   │   ├── character/         # Character-related components
│   │   ├── header/            # Navigation components
│   │   ├── homepage/          # Homepage-specific components
│   │   ├── marketplace/       # Marketplace components
│   │   ├── model-route/       # Model route components
│   │   ├── profile/           # User profile components
│   │   ├── touriiverse-story/ # Story components
│   │   └── world/             # World map components
│   ├── lib/                   # Utility functions and helpers
│   │   ├── animation/         # Animation configurations
│   │   ├── data/              # Static data and content
│   │   └── ui/                # UI primitives and base components
│   ├── styles/                # Global styles and Tailwind configuration
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
│   ├── image/                 # Image assets organized by feature
│   └── video/                 # Video assets
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
$ pnpm install
```

## Development

### Running the Application

```bash
# Development mode
$ pnpm dev

# Build for production
$ pnpm build

# Start production server
$ pnpm start
```

### Code Quality

```bash
# Format code
$ pnpm format

# Check code formatting
$ pnpm format:check
```

## Component Documentation

Tourii's frontend is built with a component-based architecture that prioritizes reusability, maintainability, and performance. Key component categories include:

### Core UI Components
- **Header**: Responsive navigation with adaptive theming based on page context
- **Character Cards/Modals**: Interactive displays for character information with smooth transitions
- **Model Route Cards**: Visual displays of travel routes with location details and images
- **Story Components**: Rich media displays for narrative content with pagination and navigation

### Interactive Elements
- **Carousels**: Custom carousel implementations for scrolling through items
- **Modal Dialogs**: Context-specific overlays with custom animations
- **Navigation Controls**: Specialized controls for moving through stories, chapters, and locations

### Pages and Layouts
- **App Layouts**: Consistent page structures with proper semantic HTML
- **Story Layouts**: Specialized layouts for narrative content with side navigation
- **Profile Pages**: User-specific layouts for displaying collectibles and travel history

## Frontend Architecture

The Tourii frontend employs several architectural patterns to ensure maintainability and performance:

### Responsive Design Strategy
The application uses a mobile-first approach with breakpoint-specific optimizations to provide a consistent experience across devices of all sizes.

### Animation System
Framer Motion powers a sophisticated animation system with standardized variants for transitions, creating a cohesive feel throughout the application.

### State Management
Each feature domain maintains its own state using React's Context API and custom hooks, avoiding unnecessary global state.

### Performance Optimizations
- Image optimization via Next.js Image component
- Component-level code splitting
- Selective hydration of interactive components
- Static generation where appropriate

## Deployment

The application is configured for deployment on Vercel, with environment-specific settings.

```bash
# Build for production
$ pnpm build

# Preview production build locally
$ pnpm start
```

## License

Tourii Frontend is [MIT licensed](LICENSE).

## Contact

For more information, please contact the Tourii development team.