import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Enhanced Middleware with Hybrid Public/Private Model
 * 
 * PUBLIC ROUTES (no authentication required):
 * - /v2/quests/* - Browse quests, view details (auth users get completion features)
 * - /v2/touriiverse/* - Read stories (auth users get quest unlocks)
 * - /v2/region/* - Browse routes (auth users get check-ins)
 * 
 * PRIVATE ROUTES (authentication required):
 * - /v2/dashboard/* - User dashboard
 * - /v2/passport/* - Digital passport
 * - /v2/admin/* - Admin panel (admin role required)
 * - /profile-dev/* - Profile management
 */
export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token;
		const { pathname } = req.nextUrl;

		// Admin routes require ADMIN role
		if (pathname.startsWith("/v2/admin")) {
			const userRole = token?.role as string;
			if (userRole !== "ADMIN") {
				// Redirect to unauthorized page or dashboard
				const url = req.nextUrl.clone();
				url.pathname = "/v2/dashboard";
				url.search = "?error=insufficient_permissions";
				return NextResponse.redirect(url);
			}
		}

		// Moderator routes require MODERATOR or ADMIN role
		if (pathname.startsWith("/v2/moderate")) {
			const userRole = token?.role as string;
			if (userRole !== "ADMIN" && userRole !== "MODERATOR") {
				const url = req.nextUrl.clone();
				url.pathname = "/v2/dashboard";
				url.search = "?error=insufficient_permissions";
				return NextResponse.redirect(url);
			}
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				// Allow access if user has a valid token
				return !!token;
			},
		},
		pages: {
			signIn: "/v2/auth/launch-app",
		},
	},
);

// Protected routes configuration
export const config = {
	matcher: [
		// PRIVATE ROUTES - Authentication required
		"/v2/dashboard/:path*",   // User dashboard
		"/v2/passport/:path*",    // Digital passport & NFTs
		"/v2/admin/:path*",       // Admin panel (role-based)
		"/profile-dev/:path*",    // Profile management
		
		// HYBRID ROUTES - Public content, enhanced features for auth users
		// Removed: "/v2/quests/:path*" - Now public with conditional features
		// Removed: "/v2/touriiverse/:path*" - Now public with conditional features  
		// Removed: "/v2/region/:path*" - Now public with conditional features
	],
};
