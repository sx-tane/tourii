import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		// Add custom middleware logic here if needed
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
		pages: {
			signIn: "/v2/auth/launch-app",
		},
	},
);

// Protect these routes
export const config = {
	matcher: [
		// "/v2/quests/:path*",
		"/v2/stories/:path*",
		// "/v2/dashboard/:path*",
		// "/v2/routes/:path*",
	],
};
