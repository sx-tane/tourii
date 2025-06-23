# Profile Page v2 Dashboard - GitHub Issues

## Parent Issue: Profile Page v2 Dashboard Transformation

**Epic**: Transform the existing static profile page into a dynamic, gamified dashboard that serves as the central hub for Tourii users to track their journey progress, manage achievements, and access perks ecosystem.

**Business Context**: 
As Tourii evolves from a simple tourism app to a comprehensive gamified travel platform, users need a centralized dashboard that motivates continued engagement through visual progress tracking, achievement showcasing, and seamless access to earned benefits.

**Current State**: 
- **Static Profile Page**: Basic user information display at `/src/app/profile-dev/page.tsx`
- **Four-Section Layout**: UserProfileCard (left column), TravelGoshuinCollection (left column), NFTInfo + NFTSelection (right columns)
- **Limited Interactivity**: "Coming Soon!" buttons with no functional dashboard features
- **Component Architecture**: Leverages existing profile components but lacks integration with user activity data
- **Responsive Design**: Built with Tailwind CSS using Tourii's warmGrey/charcoal/red color scheme

**Target State**:
- **Dynamic Dashboard Hub**: Interactive dashboard at `/src/app/v2/dashboard/page.tsx` with real-time user data
- **Widget-Based Layout**: Modular dashboard sections for current reading progress, quest status, recent activities, and travel statistics
- **Digital Passport System**: Comprehensive achievement showcase with Apple/Google Wallet integration for digital verification
- **Perks Marketplace**: Transform Goshuin system into redeemable benefits platform with e-commerce functionality
- **Real-Time Updates**: Live activity feeds, progress tracking, and notification system
- **Mobile-First Design**: Optimized touch interactions with offline capability for on-the-go travelers

**Success Metrics**:
- **User Engagement**: 40% increase in daily dashboard visits
- **Session Duration**: 60% longer average session time
- **Feature Adoption**: 70% of users interact with new dashboard widgets within first week
- **Perk Conversion**: 25% of earned Goshuin converted to real-world benefits
- **Digital Passport Usage**: 50% of users add achievements to mobile wallet

**Total Estimated Effort**: 12-16 days (3-4 week sprint)
**Priority**: High - Core user retention feature

---

## Child Issues (Frontend)

### [FE-001] Digital Passport Modal System
**Priority**: High  
**Effort**: 4-5 days  
**Assignee**: Frontend Developer  

**Description**: Create a comprehensive digital passport modal that transforms Tourii users' achievements into a shareable, verifiable digital identity - similar to a travel passport but for gamified tourism experiences.

**Business Value**: 
Provides users with a prestigious, shareable representation of their Tourii journey that can be verified in real-world scenarios (hotels, restaurants, tour operators) and stored in mobile wallets for offline access.

**Current Integration**: 
- **Replace Existing Button**: Transform "Coming Soon!" button in `TravelGoshuinCollection` component into functional "Digital Passport" trigger
- **User Profile Enhancement**: Add passport access point to `UserProfileCard` with achievement count indicator
- **Modal Architecture**: Leverage existing Framer Motion animation patterns used in quest and story modals
- **Design Consistency**: Maintain Tourii's signature color palette and typography across passport interface

**Technical Architecture**:
- **Modal Component**: `src/components/dashboard/digital-passport-modal.tsx` with full-screen overlay design
- **Achievement System**: Integration with existing achievement tracking via `useUserAchievements` hook
- **QR Code Generation**: Dynamic QR codes linking to public achievement verification page
- **Wallet Integration**: Platform-specific pass generation for iOS (Apple Wallet) and Android (Google Pay)

**Implementation Steps**:

1. **Digital Passport Modal UI Component**: Create immersive passport-style interface
   - **Passport Design**: Digital passport booklet with cover page, achievement pages, and verification QR codes
   - **Achievement Gallery**: Grid layout showcasing earned badges with unlock dates and rarity indicators
   - **User Stats Summary**: Total points, current level, completion percentages, and global ranking
   - **Verification QR Code**: Unique code linking to public achievement verification portal

2. **Apple Pay/Google Pay Wallet Integration**: Platform-specific digital wallet functionality
   - **Platform Detection**: Automatic iOS/Android detection with appropriate wallet service activation
   - **Pass Generation**: Dynamic wallet pass creation with user achievements and verification codes
   - **Offline Access**: Wallet passes function without internet connection for real-world verification
   - **Security**: Encrypted achievement data with anti-tampering verification

3. **User Journey Log Display**: Comprehensive progress visualization
   - **Timeline Interface**: Chronological view of quest completions, story chapters read, and locations visited
   - **Progress Tracking**: Visual progress bars for ongoing quests and story series
   - **Travel Map Integration**: Mini-map showing visited locations with achievement unlock markers
   - **Milestone Celebrations**: Special highlighting for major achievement unlocks and level progressions

4. **Achievement Gallery Integration**: Detailed achievement showcase
   - **Category Organization**: Achievements grouped by type (Exploration, Social, Completion, Special Events)
   - **Progress Indicators**: Locked achievements showing progress toward unlock requirements
   - **Achievement Details**: Modal-within-modal showing detailed achievement requirements and tips
   - **Social Sharing**: Direct sharing to social media with achievement images and descriptions

**Acceptance Criteria**:
- **Modal Experience**: Smooth Framer Motion animations with passport-style page transitions and loading states
- **Achievement Display**: All user achievements displayed with proper images, descriptions, unlock dates, and rarity indicators
- **Journey Visualization**: Complete user journey timeline showing quest progress, story completion, and travel statistics
- **Wallet Integration**: One-click "Add to Apple Wallet" / "Add to Google Pay" functionality with proper error handling and success confirmation
- **Mobile Optimization**: Touch-friendly interface optimized for mobile viewing with proper gesture support
- **Performance**: Modal loads within 1 second with lazy-loaded achievement images and smooth scrolling
- **Accessibility**: Full keyboard navigation support and screen reader compatibility
- **Verification System**: QR codes generate properly and link to functional verification page

**Dependencies**: [BE-002] Digital Passport & Wallet Integration

---

### [FE-002] Dashboard Widget System  
**Priority**: High  
**Effort**: 5-6 days  
**Assignee**: Frontend Developer  

**Description**: Transform the static profile layout into a dynamic, widget-based dashboard that provides Tourii users with real-time insights into their journey progress, reading activities, quest status, and travel statistics - creating an engaging hub that motivates continued platform engagement.

**Business Value**: 
Creates a personalized command center that increases user engagement by providing immediate visibility into progress, achievements, and next steps, leading to higher retention and feature adoption rates.

**Current Integration**:
- **Layout Transformation**: Convert existing 4-section profile layout into flexible dashboard grid system
- **Widget Architecture**: Replace static NFT display area with dynamic, data-driven widget components
- **Component Reuse**: Leverage existing `UserProfileCard` and enhance with widget integration points
- **Responsive Enhancement**: Maintain mobile-first design while adding desktop-optimized widget arrangements

**Technical Architecture**:
- **Dashboard Container**: `src/components/dashboard/dashboard-container.tsx` with CSS Grid layout system
- **Widget Framework**: Standardized widget components with consistent loading, error, and empty states
- **Real-Time Updates**: SWR integration for live data fetching with optimistic updates
- **State Management**: Redux slices for widget preferences, layout customization, and user interactions

**Implementation Steps**:

1. **Current Chapter Summary Widget**: Reading progress and story engagement tracker
   - **Reading Progress**: Visual progress bar showing chapter completion percentage and estimated reading time
   - **Story Context**: Current story title, chapter name, and brief content summary
   - **Quick Actions**: "Continue Reading" button with direct navigation to current chapter position
   - **Reading Statistics**: Total reading time, chapters completed today, and reading streak counter
   - **Next Chapter Preview**: Teaser content and unlock requirements for upcoming chapters

2. **Points & Ongoing Quest Counter**: Gamification progress dashboard
   - **Points Display**: Current point balance with recent point earnings animation and daily/weekly targets
   - **Level Progression**: Visual level progress bar with XP to next level and estimated completion time
   - **Active Quests**: Count of ongoing quests with progress percentages and completion deadlines
   - **Quest Recommendations**: Suggested next quests based on location and current progress
   - **Achievement Alerts**: Recent badge unlocks with celebratory animations

3. **Recent Activity Feed**: Personal achievement timeline
   - **Activity Timeline**: Last 5 completed activities with type icons (quest, story, travel, social)
   - **Activity Details**: Timestamp, points earned, location (if applicable), and achievement unlock notifications
   - **Activity Types**: Visual differentiation with color coding and custom icons for each activity category
   - **Performance Insights**: Weekly activity summary and completion rate trends
   - **Social Integration**: Option to share achievements with friends or social media

4. **Check-in Modal with Travel Analytics**: Comprehensive travel tracking system
   - **Interactive Map**: Leaflet map showing all user check-in locations with clustering and zoom controls
   - **Travel Statistics**: Total distance traveled, unique locations visited, and most visited regions
   - **Recent Check-ins**: Photo gallery of recent check-ins with location details and timestamps
   - **Travel Insights**: Monthly travel patterns, favorite location types, and exploration recommendations
   - **Route Visualization**: Completed model routes with progress indicators and difficulty ratings

5. **Moment Modal Integration**: Social sharing and memory capture
   - **Photo Upload**: Drag-and-drop photo upload with automatic location tagging and quest association
   - **Moment Gallery**: Grid view of user's shared moments with filtering by location and date
   - **Social Features**: Like, comment, and share functionality with privacy controls
   - **Location Integration**: Automatic location detection with manual override and popular location suggestions
   - **Quest Integration**: Auto-tag moments with relevant active quests and story chapters

6. **Calendar Activity Widget**: Future planning and event management
   - **Upcoming Events**: Quest deadlines, story chapter releases, and scheduled activities
   - **Calendar Integration**: Monthly calendar view with event filtering and reminder settings
   - **Planning Tools**: Add personal travel plans, set quest completion goals, and schedule reading sessions
   - **Notification Management**: Configure reminder preferences for deadlines and events
   - **Friend Activities**: View upcoming activities of friends with join/collaborate options

**Acceptance Criteria**:
- **Responsive Grid System**: Dashboard adapts seamlessly from mobile (1-column) to tablet (2-column) to desktop (3-column) layouts
- **Real-Time Data Updates**: All widgets update automatically when user completes activities, with visual feedback and animations
- **Performance Optimization**: Widgets load within 2 seconds with skeleton loading states and smooth transitions
- **Reading Integration**: Current chapter widget accurately reflects reading position and provides seamless navigation to story content
- **Quest Progress Accuracy**: Quest counters display correct active quest counts with real-time progress updates
- **Activity Feed Precision**: Recent activity shows only completed tasks with accurate timestamps and point calculations
- **Travel Data Visualization**: Check-in modal displays accurate travel statistics with interactive map functionality
- **Social Functionality**: Moment modal supports photo upload, location tagging, and social sharing with proper privacy controls
- **Calendar Functionality**: Calendar widget displays accurate upcoming events with working reminder notifications
- **Widget Consistency**: All widgets follow consistent design patterns with unified loading, error, and empty states
- **Mobile Touch Optimization**: All interactive elements properly sized for touch with haptic feedback where appropriate

**Dependencies**: [BE-001] User Dashboard Data API

---

### [FE-003] Perks (Goshuin) Page Enhancement
**Priority**: High  
**Effort**: 3-4 days  
**Assignee**: Frontend Developer  

**Description**: Transform the existing Goshuin (digital stamp) collection system into a comprehensive perks marketplace where users can redeem earned Goshuin for real-world benefits and purchase additional perks.

**Current Integration**:
- Enhance existing `/profile-dev/goshuin/[userId]/page.tsx` layout and functionality
- Leverage existing components: `GoshuinGrid`, `GoshuinCard`, `GoshuinInfo`, `RedeemDialog`
- Reuse Tourii's signature warmGrey/charcoal/red color scheme and responsive grid patterns
- Maintain consistency with existing Travel Goshuin Collection styling and animations

**Implementation Steps**:
1. **Perks State Management System**: Transform existing Goshuin display into Active/Used/Expired categorization
   - Extend existing `GoshuinGrid` component with tab-based filtering
   - Add state indicators (active badge, used stamp, expiry countdown)
   - Implement search and filter functionality by category, expiry date, and redemption value

2. **Enhanced Redeem Flow**: Upgrade existing `RedeemDialog` component into comprehensive redemption system
   - Multi-step form: Personal details → Delivery preferences → Terms confirmation
   - Real-time validation with address autocomplete and phone verification
   - Confirmation screen with estimated delivery time and tracking information
   - Success screen with redemption code and "Add to Apple/Google Wallet" option

3. **Digital Wallet Integration**: Implement platform-specific wallet functionality
   - iOS: Apple Wallet pass generation with dynamic QR codes
   - Android: Google Pay pass with location-based notifications
   - Cross-platform fallback: Email delivery with PDF voucher
   - Wallet pass includes: Redemption barcode, expiry date, terms, contact info

4. **Shop Integration & Catalog**: Create comprehensive perks marketplace
   - "Get from Shop" button in existing Goshuin collection leading to dedicated shop page
   - Product catalog grid matching existing Goshuin card design language
   - Category filtering: Food & Dining, Accommodations, Transportation, Experiences, Merchandise
   - Product details: High-quality images, descriptions, terms, availability, user reviews

5. **Shopping Cart & Checkout System**: Implement complete e-commerce flow
   - Persistent cart with session management and guest checkout option
   - Multiple payment methods: Credit card, PayPal, Apple Pay, Google Pay
   - Order summary with tax calculation, delivery options, and promotional codes
   - Purchase confirmation with order tracking and delivery notifications

6. **Perks Inventory Management**: Real-time availability and expiry handling
   - Live inventory updates with "limited availability" indicators
   - Automatic expiry date management with email/push notifications
   - Bulk operations for expired perks cleanup and renewal offers

**Acceptance Criteria**:
- **Three-Tab System**: Seamless switching between Active (redeemable), Used (redeemed), Expired (past expiry) with accurate counts and visual indicators
- **Redemption Flow**: Intuitive 4-step process (Select → Fill Form → Confirm → Success) with proper validation and error handling
- **Wallet Integration**: One-click "Add to Wallet" functionality working across iOS (Apple Wallet) and Android (Google Pay) with fallback options
- **Shop Experience**: Professional e-commerce interface with product search, filtering, wishlist, and comparison features
- **Purchase Flow**: Secure checkout process supporting multiple payment methods with order confirmation and tracking
- **Mobile Optimization**: Touch-friendly interface optimized for mobile redemption and shopping with offline capability
- **Performance**: Page load times under 2 seconds with smooth animations and transitions consistent with Tourii's design language
- **Accessibility**: WCAG compliance with keyboard navigation and screen reader support

**Dependencies**: [BE-003] Perks & Shop System API

---

## Child Issues (Backend)

### [BE-001] User Dashboard Data API
**Priority**: High  
**Effort**: 4-5 days  
**Assignee**: Backend Developer  

**Description**: Create a comprehensive, high-performance API system that aggregates user data from multiple sources (quests, stories, travel logs, achievements) to power the dashboard widgets with real-time insights and progress tracking.

**Business Value**: 
Enables personalized dashboard experience by providing unified access to user progress data, reducing frontend complexity and ensuring consistent data presentation across all dashboard widgets.

**Technical Architecture**:
- **Database Integration**: Prisma-based queries across User, Quest, Story, TravelLog, and Achievement tables
- **Caching Strategy**: Redis-based caching with 5-minute TTL for dashboard summary data
- **Performance Optimization**: Database views and materialized aggregations for complex calculations
- **Real-Time Updates**: WebSocket integration for live progress updates
- **API Structure**: RESTful endpoints with GraphQL-style field selection for efficient data fetching

**Current System Integration**:
- **Quest System**: Leverage existing quest progress tracking and completion detection
- **Story Progress**: Integrate with current chapter reading position and progress calculation
- **Travel Logs**: Aggregate user_travel_log data for location statistics and check-in history
- **Achievement System**: Connect with badge/achievement unlock tracking
- **User Management**: Utilize existing user authentication and profile data

**Implementation Steps**:

1. **User Journey Log Aggregation Endpoint**: Comprehensive progress compilation system
   - **Quest Completion Tracking**: Aggregate completed quests with timestamps, points earned, and difficulty ratings
   - **Story Progress Aggregation**: Calculate reading progress, chapters completed, and estimated reading time across all stories
   - **Travel History Compilation**: Process user_travel_log data for location visits, route completions, and travel statistics
   - **Achievement Timeline**: Chronological achievement unlock history with badge metadata and unlock conditions
   - **Performance Metrics**: Calculate completion rates, streak tracking, and progress velocity analytics

2. **Current Chapter Progress API**: Real-time reading status tracking
   - **Active Story Detection**: Identify currently reading story based on last reading activity and bookmark position
   - **Reading Progress Calculation**: Calculate chapter completion percentage, estimated reading time remaining, and reading session analytics
   - **Chapter Summary Generation**: Provide brief chapter summary, character information, and context for quick reference
   - **Next Chapter Preview**: Generate teaser content and unlock requirements for upcoming chapters
   - **Reading Analytics**: Track reading patterns, session duration, and engagement metrics

3. **Recent Activity Feed Endpoint**: Real-time activity stream generation
   - **Task Completion Tracking**: Monitor quest task completions, story chapter finishes, and achievement unlocks in real-time
   - **Activity Type Categorization**: Classify activities by type (QUEST_COMPLETED, STORY_READ, LOCATION_VISITED, ACHIEVEMENT_EARNED)
   - **Timeline Management**: Maintain chronological activity feed with proper timestamp handling and timezone support
   - **Points Attribution**: Calculate and attribute points earned for each activity with bonus multipliers
   - **Social Integration**: Prepare activity data for social sharing and friend notifications

4. **Points & Quest Counter API**: Gamification metrics calculation
   - **Point Balance Calculation**: Real-time point balance with transaction history and pending point processing
   - **Active Quest Counting**: Count ongoing quests with progress percentages and estimated completion time
   - **Level Progression Tracking**: Calculate current level, XP to next level, and level progression timeline
   - **Quest Recommendations**: AI-driven quest suggestions based on location, interests, and completion history
   - **Leaderboard Integration**: Calculate user ranking and percentile positioning for competitive elements

**API Endpoints**:

**Core Dashboard Data**:
- `GET /api/user/dashboard-summary` - Unified dashboard data (points, level, active quests, recent activity)
- `GET /api/user/stats` - Detailed user statistics (total points, completion rates, achievements)

**Journey & Progress**:
- `GET /api/user/journey-log` - Paginated journey history (quests, stories, travel, achievements)
- `GET /api/user/current-chapter` - Active reading progress and chapter details
- `GET /api/user/reading-analytics` - Reading patterns and engagement metrics

**Activity & Engagement**:
- `GET /api/user/recent-activity` - Last 5-20 completed activities with filtering options
- `GET /api/user/activity-feed` - Real-time activity stream with cursor-based pagination
- `POST /api/user/activity` - Record new activity completion with point calculation

**Quest & Achievement**:
- `GET /api/user/quest-progress` - Active quest status with progress percentages
- `GET /api/user/achievement-status` - Achievement progress and unlock requirements
- `GET /api/user/recommendations` - Personalized quest and story recommendations

**Travel & Location**:
- `GET /api/user/travel-stats` - Travel analytics (distance, locations, routes)
- `GET /api/user/check-ins` - Recent check-in history with photo metadata
- `GET /api/user/location-insights` - Travel patterns and exploration recommendations

**Performance Specifications**:
- **Response Time**: <200ms for dashboard summary, <500ms for complex aggregations
- **Caching Strategy**: Redis with 5-minute TTL for summary data, 1-hour TTL for historical data
- **Database Optimization**: Indexed queries with query plan analysis and performance monitoring
- **Concurrent Users**: Support 1000+ concurrent dashboard requests with horizontal scaling
- **Data Freshness**: Real-time updates for critical data (points, active quests) with eventual consistency for historical data

**Acceptance Criteria**:
- **Unified Data Access**: Single API call provides all essential dashboard data with sub-200ms response time
- **Real-Time Accuracy**: Points, quest progress, and activity feeds reflect real-time user actions within 5 seconds
- **Historical Data**: Journey log provides complete user history with efficient pagination and filtering
- **Reading Integration**: Current chapter API accurately reflects reading position and provides seamless story continuation
- **Performance Optimization**: Database queries optimized with proper indexing and caching strategies
- **Error Handling**: Comprehensive error responses with fallback data for partial failures
- **Security**: All endpoints properly authenticated with rate limiting and input validation
- **Scalability**: API architecture supports horizontal scaling for increased user load
- **Monitoring**: Complete observability with performance metrics, error tracking, and usage analytics

---

### [BE-002] Digital Passport & Wallet Integration  
**Priority**: High  
**Effort**: 6-7 days  
**Assignee**: Backend Developer  

**Description**: Create a sophisticated digital passport system that transforms user achievements into verifiable, shareable digital credentials compatible with Apple Wallet and Google Pay, enabling offline verification and real-world benefit redemption.

**Business Value**: 
Provides users with a prestigious, verifiable digital identity that can be used for real-world perks, hotel check-ins, restaurant discounts, and tour operator benefits, creating additional revenue streams through partnership integrations.

**Technical Architecture**:
- **Passport Generation**: PDF generation using Puppeteer with dynamic QR codes and achievement verification
- **Wallet Integration**: Platform-specific pass generation using PassKit (iOS) and Google Pay API (Android)
- **Security Framework**: JWT-based verification with cryptographic signatures and anti-tampering measures
- **Storage System**: S3-compatible storage for passport images and verification data
- **Verification Portal**: Public API for third-party verification of achievement claims

**Current System Integration**:
- **Achievement System**: Aggregate user badges, completion dates, and rarity levels
- **User Profile**: Access profile photos, personal information, and verification status
- **Quest/Story Progress**: Include completion statistics and milestone achievements
- **Travel Data**: Incorporate travel statistics and location-based achievements

**Implementation Steps**:

1. **Digital Passport Generation API**: Comprehensive credential creation system
   - **Achievement Compilation**: Aggregate all user achievements with metadata (unlock dates, rarity, verification status)
   - **Passport Design System**: Generate professional passport-style documents with Tourii branding and security features
   - **QR Code Generation**: Create unique, cryptographically signed QR codes linking to verification portal
   - **PDF Export Functionality**: High-quality PDF generation with embedded security features and print optimization
   - **Verification System**: Public verification portal allowing third parties to authenticate achievement claims
   - **Security Features**: Watermarks, cryptographic signatures, and tamper-evident design elements

2. **Apple Pay/Google Pay Wallet Integration**: Cross-platform digital wallet support
   - **Platform Detection**: Automatic device/browser detection for appropriate wallet service selection
   - **PassKit Integration**: Apple Wallet pass generation with proper certificate management and signing
   - **Google Pay API**: Android wallet pass creation with Material Design compliance
   - **Pass Formatting**: Platform-specific formatting for optimal display and functionality
   - **Update Mechanism**: Real-time pass updates when users earn new achievements
   - **Offline Functionality**: Passes work without internet connection for real-world verification scenarios

**API Endpoints**:

**Passport Generation**:
- `POST /api/passport/generate` - Create digital passport with all user achievements
- `GET /api/passport/{userId}` - Retrieve existing passport data
- `POST /api/passport/refresh` - Update passport with new achievements
- `GET /api/passport/preview` - Generate passport preview without full processing

**Wallet Integration**:
- `POST /api/wallet/apple/pass` - Generate Apple Wallet pass
- `POST /api/wallet/google/pass` - Generate Google Pay pass  
- `GET /api/wallet/status/{passId}` - Check pass status and updates
- `POST /api/wallet/update` - Push updates to existing wallet passes

**Verification System**:
- `GET /api/verify/{verificationCode}` - Public verification endpoint for achievement validation
- `POST /api/verify/batch` - Batch verification for multiple achievement claims
- `GET /api/verify/qr/{qrCode}` - QR code-based verification for offline scenarios

**Security & Compliance**:
- `POST /api/passport/revoke` - Revoke passport access (security incidents)
- `GET /api/passport/audit/{userId}` - Audit trail for passport generation and usage
- `POST /api/verification/report` - Report suspicious verification attempts

**Technical Specifications**:

**Security Requirements**:
- **Cryptographic Signing**: All passes signed with RSA-2048 certificates
- **QR Code Security**: JWT-based QR codes with expiration and single-use options
- **Data Encryption**: AES-256 encryption for stored passport data
- **Certificate Management**: Automated certificate renewal and key rotation

**Performance Requirements**:
- **Generation Time**: Passport generation completes within 10 seconds
- **Pass Distribution**: Wallet passes delivered within 5 seconds
- **Verification Speed**: QR code verification responds within 2 seconds
- **Concurrent Processing**: Support 100+ simultaneous passport generations

**Platform Compatibility**:
- **iOS Compatibility**: iOS 12+ with Apple Wallet integration
- **Android Compatibility**: Android 8+ with Google Pay support
- **Web Fallback**: Browser-based passport viewing for unsupported devices
- **Offline Support**: QR codes work without internet connectivity

**Acceptance Criteria**:
- **Passport Generation**: Digital passports generate with complete achievement data, professional formatting, and security features
- **Cross-Platform Wallet Support**: Both Apple Wallet and Google Pay integration works seamlessly across devices
- **Verification System**: QR codes and verification portal work reliably for third-party validation
- **Security Compliance**: All security features (signatures, encryption, tamper-evidence) function correctly
- **Performance Standards**: Generation and distribution meet specified time requirements
- **Real-World Integration**: Passes function offline and integrate with partner verification systems
- **Update Mechanism**: Wallet passes update automatically when users earn new achievements
- **Error Handling**: Comprehensive error handling for generation failures, network issues, and verification problems

---

### [BE-003] Perks & Shop System API
**Priority**: High  
**Effort**: 5-6 days  
**Assignee**: Backend Developer  

**Description**: Build a comprehensive e-commerce and perks management system that transforms Tourii's Goshuin (digital stamps) into a marketplace for real-world tourism benefits, enabling users to redeem earned rewards and purchase additional perks from local partners.

**Business Value**: 
Creates a revenue-generating ecosystem where earned Goshuin become valuable currency for real-world benefits, while enabling monetization through perk sales and partner commissions from local businesses (hotels, restaurants, attractions).

**Technical Architecture**:
- **Perks Engine**: State machine-based perk lifecycle management with automated expiry handling
- **E-commerce Platform**: Full-featured shopping system with cart persistence and multi-payment support
- **Partner Integration**: API framework for local business integration and real-time inventory sync
- **Payment Processing**: Multi-gateway payment system (Stripe, PayPal, Apple Pay, Google Pay)
- **Inventory Management**: Real-time stock tracking with automated reordering and availability notifications

**Current System Integration**:
- **Goshuin System**: Transform existing digital stamps into redeemable currency
- **User Management**: Leverage existing user profiles and authentication
- **Location Services**: Integrate with travel data for location-based perk recommendations
- **Notification System**: Utilize existing notification infrastructure for order updates

**Implementation Steps**:

1. **Perks Management System**: Comprehensive lifecycle and state management
   - **State Machine Implementation**: Robust state tracking (EARNED → ACTIVE → REDEEMED/EXPIRED) with automated transitions
   - **Inventory Integration**: Real-time inventory sync with partner systems and automatic availability updates
   - **Expiry Management**: Automated expiry date tracking with email/push notifications and renewal opportunities
   - **Value Calculation**: Dynamic perk valuation based on rarity, demand, and seasonal factors
   - **Usage Analytics**: Track redemption patterns, popular perks, and user preferences for optimization
   - **Partner Management**: API framework for partner businesses to manage their perk offerings

2. **Perks Redemption API**: Streamlined redemption workflow with validation
   - **Multi-Step Validation**: User eligibility, perk availability, location restrictions, and terms compliance
   - **Form Processing**: Personal information capture with address validation and delivery preferences
   - **Redemption Workflow**: Automated processing with partner notification and confirmation generation
   - **History Tracking**: Complete audit trail of redemption attempts, successes, and failures
   - **Delivery Management**: Integration with logistics providers for physical perk delivery
   - **Customer Support**: Redemption issue tracking and resolution workflow

3. **Shop System API**: Full-featured e-commerce platform for perk purchases
   - **Product Catalog Management**: Dynamic catalog with categories, pricing, seasonal offerings, and featured items
   - **Advanced Search & Filtering**: Location-based filtering, price ranges, availability, and user preference matching
   - **Recommendation Engine**: AI-driven product recommendations based on user travel patterns and preferences
   - **Inventory Synchronization**: Real-time stock levels with partner systems and automatic out-of-stock handling
   - **Pricing Management**: Dynamic pricing with seasonal adjustments, bulk discounts, and promotional campaigns
   - **Product Analytics**: Track product performance, conversion rates, and user engagement metrics

4. **Shopping Cart & Checkout System**: Professional e-commerce experience
   - **Persistent Cart Management**: Cross-device cart synchronization with guest and authenticated user support
   - **Advanced Checkout Flow**: Multi-step checkout with address validation, delivery options, and order summaries
   - **Payment Gateway Integration**: Multiple payment options (Stripe, PayPal, Apple Pay, Google Pay) with PCI compliance
   - **Order Processing**: Automated order fulfillment with partner notification and tracking number generation
   - **Tax Calculation**: Location-based tax calculation with compliance for multiple jurisdictions
   - **Promotional System**: Coupon codes, bulk discounts, and loyalty program integration

**API Endpoints**:

**Perks Management**:
- `GET /api/perks/user/{userId}` - User's complete perk inventory with state information
- `GET /api/perks/status/{status}` - Filter perks by status (ACTIVE, USED, EXPIRED)
- `PUT /api/perks/{perkId}/state` - Manual state transitions (admin/support use)
- `GET /api/perks/expiring` - Perks expiring within specified timeframe
- `POST /api/perks/extend/{perkId}` - Extend expiry date (premium feature)

**Redemption System**:
- `POST /api/perks/{perkId}/redeem` - Initiate perk redemption process
- `GET /api/redemption/{redemptionId}` - Track redemption status and progress
- `POST /api/redemption/{redemptionId}/confirm` - Confirm redemption details
- `GET /api/redemption/history` - User's complete redemption history
- `POST /api/redemption/{redemptionId}/cancel` - Cancel pending redemption

**Shop & Catalog**:
- `GET /api/shop/catalog` - Complete product catalog with filtering and pagination
- `GET /api/shop/categories` - Product categories with counts and featured items
- `GET /api/shop/products/{productId}` - Detailed product information
- `GET /api/shop/search` - Advanced product search with multiple criteria
- `GET /api/shop/recommendations/{userId}` - Personalized product recommendations

**Shopping Cart**:
- `GET /api/cart/{userId}` - Retrieve user's shopping cart
- `POST /api/cart/add` - Add item to cart with quantity and options
- `PUT /api/cart/update` - Update item quantities or remove items
- `DELETE /api/cart/clear` - Clear entire cart
- `POST /api/cart/merge` - Merge guest cart with authenticated user cart

**Checkout & Orders**:
- `POST /api/checkout/calculate` - Calculate totals, taxes, and shipping
- `POST /api/checkout/process` - Process payment and create order
- `GET /api/orders/{userId}` - User's order history with status tracking
- `GET /api/orders/{orderId}` - Detailed order information and tracking
- `POST /api/orders/{orderId}/cancel` - Cancel order (if allowed)

**Partner Integration**:
- `GET /api/partners/inventory` - Real-time inventory from partner systems
- `POST /api/partners/notify` - Notify partners of new orders/redemptions
- `GET /api/partners/analytics` - Partner performance and sales analytics

**Technical Specifications**:

**Performance Requirements**:
- **Cart Operations**: Add/update/remove items respond within 500ms
- **Checkout Processing**: Complete payment processing within 10 seconds
- **Catalog Loading**: Product catalog loads within 2 seconds with pagination
- **Search Performance**: Product search results within 1 second
- **Concurrent Users**: Support 500+ simultaneous shopping sessions

**Integration Requirements**:
- **Payment Gateways**: Stripe, PayPal, Apple Pay, Google Pay with webhook handling
- **Inventory Systems**: Real-time sync with partner inventory management systems
- **Logistics Providers**: Integration with shipping providers for tracking and delivery
- **Tax Services**: Integration with tax calculation services for compliance
- **Email/SMS**: Automated notifications for order confirmations and updates

**Security & Compliance**:
- **PCI DSS Compliance**: Secure payment processing with tokenization
- **Data Protection**: GDPR/CCPA compliant user data handling
- **Fraud Prevention**: Real-time fraud detection and prevention measures
- **API Security**: Rate limiting, authentication, and input validation

**Acceptance Criteria**:
- **Perk Lifecycle Management**: All perk states (Active/Used/Expired) transition correctly with proper validation and notifications
- **Redemption Flow Integrity**: Complete redemption process from selection through fulfillment with error handling and rollback
- **E-commerce Functionality**: Full shopping experience with cart persistence, secure checkout, and order tracking
- **Payment Processing**: All payment methods work reliably with proper error handling and refund capabilities
- **Inventory Accuracy**: Real-time inventory tracking with partner systems and automatic availability updates
- **Partner Integration**: Seamless partner onboarding and real-time communication for order fulfillment
- **Performance Standards**: All API endpoints meet specified response time requirements under load
- **Security Compliance**: Payment processing meets PCI DSS standards with secure data handling
- **Analytics & Reporting**: Comprehensive tracking of sales, redemptions, and user behavior for business optimization

---

## Implementation Priority

### Phase 1 (Week 1): Core Dashboard
- FE-002: Dashboard Widget System (Current Chapter, Points, Recent Activity)
- BE-001: User Dashboard Data API

### Phase 2 (Week 2): Digital Passport & Journey
- FE-001: Digital Passport Modal System (User Journey Log, Achievement Gallery)
- BE-002: Digital Passport Generation and Wallet Integration

### Phase 3 (Week 3): Perks & Shop Enhancement
- FE-003: Perks (Goshuin) Page Enhancement (State Management, Redeem Flow, Shop System)
- BE-003: Perks & Shop System API

**Total Timeline**: 3 weeks with parallel frontend/backend development