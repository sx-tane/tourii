# 🔐 ULTIMATE AUTHENTICATION CATEGORIZATION TODO

> **Implementation Guide for User Session Authentication System**  
> Created: 2025-06-25 | Issue: #175 | Priority: CRITICAL SECURITY

## 🚨 CRITICAL SECURITY FIXES (DO FIRST)

### **Immediate Actions Required**

#### 1. Remove Hardcoded User IDs (CRITICAL)
**Problem**: All API routes use same hardcoded user ID: `"TSU202506-ae8a85-222006-4bdd44-BAAA"`
**Impact**: ❌ Breaks user isolation - all users see same data

**Files to Fix:**
- [ ] `/src/app/api/checkins/route.ts` - Line 42
- [ ] `/src/app/api/passport/route.ts` - Line 11  
- [ ] `/src/app/api/admin/users/route.ts` - Line 30
- [ ] `/src/app/api/moments/route.ts` - Search for hardcoded ID
- [ ] All quest API routes - Search for hardcoded ID
- [ ] All story API routes - Search for hardcoded ID
- [ ] All route/tourist-spot API routes - Search for hardcoded ID

**Fix Pattern:**
```typescript
// ❌ REMOVE
const userId = "TSU202506-ae8a85-222006-4bdd44-BAAA";

// ✅ REPLACE WITH
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
const userId = session.user.id;
```

#### 2. Remove Mock Authentication Bypass (CRITICAL)
**Problem**: `providers.tsx` bypasses authentication in development
**Impact**: ❌ Development environment has no real authentication

**File to Fix:**
- [ ] `/src/app/providers.tsx` - Lines 28-34

**Fix:**
```typescript
// ❌ REMOVE entire mock session bypass
if (process.env.NODE_ENV === "development") {
    return (
        <SessionProvider session={mockSession.data}>
            {children}
        </SessionProvider>
    );
}

// ✅ REPLACE WITH proper development auth
export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>{children}</ReduxProvider>
        </SessionProvider>
    );
}
```

#### 3. Update Middleware Protection (CRITICAL)
**Problem**: Admin routes completely unprotected, wrong hybrid model setup
**Impact**: ❌ Admin panel accessible to anyone

**File to Fix:**
- [ ] `/src/middleware.ts` - Lines 21-27

**Fix:**
```typescript
export const config = {
    matcher: [
        // PRIVATE ROUTES (Authentication Required)
        "/v2/dashboard/:path*",     // User dashboard
        "/v2/passport/:path*",      // Digital passport
        "/profile-dev/:path*",      // Dev profile pages
        
        // ADMIN ROUTES (Admin Role Required)  
        "/v2/admin/:path*",         // ⚠️ CRITICAL - Currently unprotected!
        
        // HYBRID ROUTES - REMOVE FROM PROTECTION
        // "/v2/touriiverse/:path*", // ✅ Make public with auth enhancements
        // "/v2/region/:path*",       // ✅ Make public with auth enhancements
        // "/v2/quests/:path*",       // ✅ Already hybrid - keep unprotected
    ],
};
```

---

## 🔓 PUBLIC PAGES (No Authentication Required)

### **Marketing & Legal Pages**
- [ ] `/` - Homepage - **KEEP PUBLIC** ✅ Already correct
- [ ] `/about` - About page - **KEEP PUBLIC** ✅ Already correct  
- [ ] `/world` - World page - **KEEP PUBLIC** ✅ Already correct
- [ ] `/character` - Character page - **KEEP PUBLIC** ✅ Already correct
- [ ] `/privacy` - Privacy policy - **KEEP PUBLIC** ✅ Already correct
- [ ] `/terms` - Terms of service - **KEEP PUBLIC** ✅ Already correct
- [ ] `/cookies` - Cookie policy - **KEEP PUBLIC** ✅ Already correct

### **V2 Authentication & Onboarding**
- [ ] `/v2` - V2 homepage - **KEEP PUBLIC** ✅ Already correct
- [ ] `/v2/auth/launch-app` - Login/signup page - **KEEP PUBLIC** ✅ Already correct
- [ ] `/v2/auth/complete-profile` - Profile completion - **KEEP PUBLIC** ✅ Already correct
- [ ] `/v2/auth/error` - Auth error page - **KEEP PUBLIC** ✅ Already correct

### **Development Routes (Temporary)**
- [ ] `/profile-dev` - Dev profile page - **KEEP PUBLIC** (Development only)
- [ ] `/profile-dev/goshuin/[userId]` - User goshuin page - **KEEP PUBLIC** (Development only)

---

## 🌍 HYBRID PAGES (Public Browsing + Enhanced Auth Features)

> **Pattern**: Public users can browse and read content. Authenticated users get enhanced interactive features.

### **Quest System** (Your Preferred Model ✅)
- [ ] `/v2/quests` - Quest listing - **IMPLEMENT HYBRID**
  - **Current**: ✅ Already unprotected (middleware line 22 commented)
  - **Public Features**: Browse quest list, view descriptions, read requirements
  - **Auth Features**: Complete tasks, earn rewards, unlock new quests, track progress
  - **Implementation**: Add conditional UI components

- [ ] `/v2/quests/[questId]` - Individual quest page - **IMPLEMENT HYBRID**
  - **Current**: ✅ Already unprotected  
  - **Public Features**: View quest details, read task descriptions, see rewards
  - **Auth Features**: Complete tasks, track progress, earn magatama, submit answers
  - **Implementation**: Add conditional UI for task completion

- [ ] `/v2/quests/[questId]/[taskId]` - Quest task page - **IMPLEMENT HYBRID**
  - **Current**: ✅ Already unprotected
  - **Public Features**: View task instructions, see requirements, understand objectives
  - **Auth Features**: Submit answers, upload photos, complete tasks, earn rewards
  - **Implementation**: Add conditional forms and submission components

### **Story System** (Convert from Private to Hybrid)
- [ ] `/v2/touriiverse` - Story listing - **CONVERT TO HYBRID**
  - **Current**: ❌ Protected by middleware (line 23)
  - **Fix**: Remove from middleware.ts matcher array
  - **Public Features**: Browse story list, read descriptions, view available chapters
  - **Auth Features**: Unlock quests from stories, save reading progress, earn rewards
  - **Implementation**: Create `ConditionalStoryFeatures` component

- [ ] `/v2/touriiverse/[storyId]` - Individual story - **CONVERT TO HYBRID**
  - **Current**: ❌ Protected by middleware  
  - **Fix**: Remove protection via middleware update
  - **Public Features**: View story details, read chapter list, see story progression
  - **Auth Features**: Unlock chapters, track reading progress, access premium content
  - **Implementation**: Add conditional chapter unlock UI

- [ ] `/v2/touriiverse/[storyId]/chapters/[storyChapterId]` - Story chapters - **CONVERT TO HYBRID**
  - **Current**: ❌ Protected by middleware
  - **Fix**: Remove protection via middleware update  
  - **Public Features**: Read chapter content, view world lore tab, see character info
  - **Auth Features**: Unlock quests on completion, save progress, earn magatama
  - **Implementation**: Add `QuestUnlockModal` for chapter completion

### **Route/Region System** (Convert from Private to Hybrid)
- [ ] `/v2/region` - Region selection - **CONVERT TO HYBRID**
  - **Current**: ❌ Protected by middleware (line 25)
  - **Fix**: Remove from middleware.ts matcher array
  - **Public Features**: Browse regions, view available routes, see tourist spots
  - **Auth Features**: Track visits, collect stamps, unlock achievements
  - **Implementation**: Create `ConditionalRegionFeatures` component

- [ ] `/v2/region/[region]` - Regional routes - **CONVERT TO HYBRID**
  - **Current**: ❌ Protected by middleware
  - **Fix**: Remove protection via middleware update
  - **Public Features**: View route list, read descriptions, see difficulty ratings
  - **Auth Features**: Track progress, check-in at spots, earn rewards
  - **Implementation**: Add conditional progress tracking UI

- [ ] `/v2/region/[region]/[modelRouteId]` - Specific route - **CONVERT TO HYBRID**
  - **Current**: ❌ Protected by middleware
  - **Fix**: Remove protection via middleware update
  - **Public Features**: View route map, tourist spot details, see route information
  - **Auth Features**: Check-in at locations, collect stamps, complete route challenges
  - **Implementation**: Add conditional check-in buttons and progress tracking

---

## 🔒 PRIVATE PAGES (Authentication Required)

### **User Dashboard & Personal Data**
- [ ] `/v2/dashboard` - Main dashboard - **ADD AUTHENTICATION**
  - **Current**: ⚠️ **CRITICAL** - Completely unprotected (not in middleware)
  - **Fix**: Add to middleware.ts matcher array
  - **Features**: Personal stats, achievements, progress tracking, user-specific data
  - **Implementation**: Verify requires authenticated session

- [ ] `/v2/passport` - Digital passport - **ADD AUTHENTICATION** 
  - **Current**: ⚠️ **CRITICAL** - Completely unprotected (not in middleware)
  - **Fix**: Add to middleware.ts matcher array
  - **Features**: Personal NFT collection, travel stamps, achievements, passport data
  - **Implementation**: Verify requires authenticated session

### **Admin Panel** (Admin Role Required)
> **⚠️ CRITICAL SECURITY ISSUE**: All admin routes are completely unprotected!

- [ ] `/v2/admin` - Admin dashboard - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add to middleware + implement role check
  - **Access**: Admin role only
  - **Implementation**: Add role-based route guard

- [ ] `/v2/admin/analytics` - Analytics dashboard - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

- [ ] `/v2/admin/users` - User management - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected  
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

- [ ] `/v2/admin/submissions` - Submission management - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

- [ ] `/v2/admin/stories` - Story management - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

- [ ] `/v2/admin/stories/[storyId]` - Individual story admin - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

- [ ] `/v2/admin/quests` - Quest management - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

- [ ] `/v2/admin/quests/[questId]` - Individual quest admin - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

- [ ] `/v2/admin/model-routes` - Route management - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

- [ ] `/v2/admin/model-routes/[routeId]` - Individual route admin - **ADD ADMIN AUTHENTICATION**
  - **Current**: ❌ **CRITICAL** - Completely unprotected
  - **Fix**: Add protection + role check
  - **Access**: Admin role only

---

## 🛡️ API ROUTES AUTHENTICATION (37+ Endpoints)

### **Authentication APIs** (Public)
- [ ] `POST /api/auth/[...nextauth]` - NextAuth endpoints - **KEEP PUBLIC** ✅

### **Admin APIs** (Admin Role Required) 
> **⚠️ All admin APIs currently use hardcoded user ID**

- [ ] `GET/POST /api/admin/users` - User management - **ADD ADMIN AUTHENTICATION**
  - **Fix**: Replace hardcoded ID with session-based admin check
  - **Implementation**: Add admin role validation

- [ ] `GET/POST /api/admin/submissions` - Submission management - **ADD ADMIN AUTHENTICATION**
  - **Fix**: Replace hardcoded ID with session-based admin check
  - **Implementation**: Add admin role validation

- [ ] `POST /api/admin/submissions/[id]/verify` - Verify submissions - **ADD ADMIN AUTHENTICATION**
  - **Fix**: Add admin authentication check
  - **Implementation**: Add admin role validation

### **User Data APIs** (Private)
> **⚠️ All user APIs currently use hardcoded user ID**

- [ ] `GET/POST /api/moments` - User moments - **ADD USER AUTHENTICATION**
  - **Fix**: Replace hardcoded ID with real user session
  - **Implementation**: Get user ID from session

- [ ] `GET/POST /api/checkins` - Check-ins - **ADD USER AUTHENTICATION**
  - **Fix**: Replace hardcoded ID with real user session (line 42)
  - **Implementation**: Get user ID from session

- [ ] `GET /api/passport` - Digital passport data - **ADD USER AUTHENTICATION**
  - **Fix**: Replace hardcoded ID with real user session (line 11)
  - **Implementation**: Get user ID from session

- [ ] `POST /api/redeem` - NFT redemption - **ADD USER AUTHENTICATION**
  - **Fix**: Add user session check
  - **Implementation**: Get user ID from session

### **Content APIs** (Hybrid - Public Read / Auth Write)
- [ ] `GET /api/homepage/highlights` - Homepage highlights - **KEEP PUBLIC** ✅

#### Quest APIs
- [ ] `GET /api/quests` - Quest listing - **KEEP PUBLIC** ✅
- [ ] `POST /api/quests` - Create quest - **ADD ADMIN AUTHENTICATION**
- [ ] `PUT /api/quests/update-quest` - Update quest - **ADD ADMIN AUTHENTICATION**
- [ ] `GET /api/quests/[questId]` - Quest details - **KEEP PUBLIC** ✅
- [ ] `POST /api/quests/create-quest` - Create quest - **ADD ADMIN AUTHENTICATION**
- [ ] `POST /api/quests/create-task/[questId]` - Create task - **ADD ADMIN AUTHENTICATION**
- [ ] `PUT /api/quests/update-task` - Update task - **ADD ADMIN AUTHENTICATION**
- [ ] `DELETE /api/quests/delete-task/[taskId]` - Delete task - **ADD ADMIN AUTHENTICATION**

#### Story APIs  
- [ ] `GET /api/stories/sagas` - Story listing - **KEEP PUBLIC** ✅
- [ ] `GET /api/stories/[storyId]` - Story details - **KEEP PUBLIC** ✅
- [ ] `GET /api/stories/[storyId]/chapters` - Story chapters - **KEEP PUBLIC** ✅
- [ ] `POST /api/stories/chapters/[chapterId]/complete` - Complete chapter - **ADD USER AUTHENTICATION**
- [ ] `POST /api/stories/create-saga` - Create story - **ADD ADMIN AUTHENTICATION**
- [ ] `PUT /api/stories/update-saga/[storyId]` - Update story - **ADD ADMIN AUTHENTICATION**
- [ ] `POST /api/stories/create-chapter/[storyId]` - Create chapter - **ADD ADMIN AUTHENTICATION**
- [ ] `PUT /api/stories/update-chapter/[chapterId]` - Update chapter - **ADD ADMIN AUTHENTICATION**
- [ ] `DELETE /api/stories/delete-chapter/[chapterId]` - Delete chapter - **ADD ADMIN AUTHENTICATION**

#### Route APIs
- [ ] `GET /api/routes/model-routes` - Route listing - **KEEP PUBLIC** ✅
- [ ] `GET /api/routes/[modelRouteId]` - Route details - **KEEP PUBLIC** ✅
- [ ] `GET /api/routes/tourist-spots/[storyChapterId]` - Tourist spots - **KEEP PUBLIC** ✅
- [ ] `POST /api/routes/create-model-route` - Create route - **ADD ADMIN AUTHENTICATION**
- [ ] `PUT /api/routes/update-model-route/[modelRouteId]` - Update route - **ADD ADMIN AUTHENTICATION**
- [ ] `POST /api/routes/create-tourist-spot/[modelRouteId]` - Create spot - **ADD ADMIN AUTHENTICATION**
- [ ] `PUT /api/routes/update-tourist-spot` - Update spot - **ADD ADMIN AUTHENTICATION**
- [ ] `DELETE /api/routes/delete-tourist-spot/[touristSpotId]` - Delete spot - **ADD ADMIN AUTHENTICATION**

### **Task Submission APIs** (User Auth Required)
- [ ] `POST /api/tasks/answer-text` - Submit text answer - **ADD USER AUTHENTICATION**
- [ ] `POST /api/tasks/check-in` - Submit check-in - **ADD USER AUTHENTICATION**
- [ ] `POST /api/tasks/select-option` - Submit option selection - **ADD USER AUTHENTICATION**

---

## 🏗️ IMPLEMENTATION COMPONENTS

### **1. Authentication Guard Components**
**Create**: `/src/components/auth/`

#### `AuthGuard.tsx`
```typescript
interface AuthGuardProps {
    children: ReactNode;
    requiredRole?: "USER" | "ADMIN" | "MODERATOR";
    fallback?: ReactNode;
}

export const AuthGuard = ({ children, requiredRole, fallback }: AuthGuardProps) => {
    const { data: session, status } = useSession();
    
    if (status === "loading") return <LoadingSpinner />;
    if (status === "unauthenticated") {
        redirect("/v2/auth/launch-app");
    }
    if (requiredRole === "ADMIN" && !isAdmin(session)) {
        return fallback || <UnauthorizedPage />;
    }
    
    return <>{children}</>;
};
```

#### `ConditionalFeatures.tsx`
```typescript
interface ConditionalFeaturesProps {
    publicContent: ReactNode;
    authenticatedContent: ReactNode;
    signInPrompt?: string;
}

export const ConditionalFeatures = ({ 
    publicContent, 
    authenticatedContent, 
    signInPrompt = "Sign in to unlock enhanced features!" 
}: ConditionalFeaturesProps) => {
    const { data: session } = useSession();
    
    return (
        <>
            {publicContent}
            {session ? authenticatedContent : <SignInPrompt message={signInPrompt} />}
        </>
    );
};
```

#### `SignInPrompt.tsx`
```typescript
interface SignInPromptProps {
    message: string;
    className?: string;
}

export const SignInPrompt = ({ message, className }: SignInPromptProps) => (
    <div className={cn("text-center p-4 bg-warmGrey3 rounded-lg", className)}>
        <p className="text-charcoal mb-3">{message}</p>
        <Link href="/v2/auth/launch-app">
            <Button className="bg-red text-white hover:bg-red/90">
                Sign In to Continue
            </Button>
        </Link>
    </div>
);
```

### **2. Role-Based Access Control**
**Update**: `/src/lib/auth.ts`

```typescript
// Add to JWT callback
async jwt({ token, user }) {
    if (user) {
        token.role = await getUserRole(user.id);
        token.userLevel = await getUserLevel(user.id);
    }
    return token;
}

// Add to session callback  
async session({ session, token }) {
    session.user.role = token.role;
    session.user.userLevel = token.userLevel;
    return session;
}

// Helper functions
export function isAdmin(session: Session | null): boolean {
    return session?.user?.role === "ADMIN";
}

export function isModerator(session: Session | null): boolean {
    return session?.user?.role === "MODERATOR" || isAdmin(session);
}
```

### **3. Enhanced Middleware**
**Update**: `/src/middleware.ts`

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // Admin routes require admin role
        if (pathname.startsWith("/v2/admin")) {
            if (token?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/v2/auth/launch-app", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                
                // Admin routes require admin role
                if (pathname.startsWith("/v2/admin")) {
                    return token?.role === "ADMIN";
                }
                
                // Other protected routes just need valid token
                return !!token;
            },
        },
        pages: {
            signIn: "/v2/auth/launch-app",
        },
    },
);
```

---

## 🎯 IMPLEMENTATION PHASES

### **Phase 1: Critical Security (DO FIRST)** 
**Priority**: CRITICAL | **Time**: 1-2 days

1. [ ] Remove all hardcoded user IDs from API routes
2. [ ] Remove mock authentication bypass from providers.tsx
3. [ ] Update middleware.ts to protect admin routes
4. [ ] Add basic role-based access control
5. [ ] Test authentication flow

### **Phase 2: Hybrid Model Implementation**
**Priority**: HIGH | **Time**: 2-3 days

1. [ ] Remove story/route protection from middleware
2. [ ] Create authentication guard components
3. [ ] Implement conditional UI components
4. [ ] Add "Sign in to unlock features" prompts
5. [ ] Test hybrid page functionality

### **Phase 3: Enhanced Features**
**Priority**: MEDIUM | **Time**: 3-4 days

1. [ ] Add user progress tracking
2. [ ] Implement achievement systems  
3. [ ] Enhance quest unlock mechanics
4. [ ] Add role-based admin features
5. [ ] Performance optimization

### **Phase 4: Testing & Validation**
**Priority**: HIGH | **Time**: 1-2 days

1. [ ] Test authentication flows
2. [ ] Verify role-based access control
3. [ ] Validate user isolation
4. [ ] Test hybrid page functionality
5. [ ] Security audit

---

## 📊 PROGRESS TRACKING

**Total Items**: 87 authentication-related tasks
- **Critical Security Fixes**: 15 items
- **Public Pages**: 11 items ✅ (Already correct)
- **Hybrid Pages**: 9 items (Need conversion)
- **Private Pages**: 12 items (Need protection)  
- **API Routes**: 40+ items (Need authentication)

**Implementation Status**: 
- 🔴 **Critical Issues**: 15 items requiring immediate attention
- 🟡 **Hybrid Conversion**: 9 items requiring middleware + UI changes  
- 🟢 **Public Pages**: 11 items already correctly implemented

---

## 💡 ULTRATHINKING INSIGHTS

### **Why This Approach Works**
1. **Security First**: Addresses critical vulnerabilities immediately
2. **User Experience**: Hybrid model maximizes content discovery + engagement
3. **Business Impact**: Public browsing drives user registration
4. **Development Efficiency**: Leverages existing quest page patterns
5. **Scalability**: Clean architecture for future authentication features

### **Key Success Factors**
1. **Fix hardcoded user IDs FIRST** - critical for user isolation
2. **Follow quest page pattern** - proven hybrid model implementation
3. **Implement role-based access** - proper admin security
4. **Test thoroughly** - authentication bugs are security vulnerabilities
5. **Document patterns** - ensure consistent implementation

### **Risk Mitigation**
1. **Phase implementation** - don't break existing functionality
2. **Backup authentication** - fallback mechanisms for edge cases
3. **Role validation** - multiple layers of admin protection
4. **Session management** - proper logout and session expiry
5. **Performance monitoring** - authentication shouldn't slow down app

---

*Created: 2025-06-25 | For Issue: #175 | Priority: CRITICAL*
*Next Steps: Start with Phase 1 Critical Security Fixes*