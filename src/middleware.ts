// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
export default withAuth(
  // Optional custom middleware logic
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) return false;
        const adminPaths = ["/v2/admin"];
        if (adminPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
          return token.role === "admin";
        }
        return true;
      }
    },
    pages: { 
      signIn: "/auth/login"      // redirect here if not authorized
    }
  }
);
export const config = {
  matcher: [
    "/v2/quests/:path*",
    "/v2/stories/:path*",
    "/v2/dashboard/:path*",
    "/v2/routes/:path*",
    "/v2/admin/:path*",
  ]
};
