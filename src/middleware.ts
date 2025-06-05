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
      authorized: ({ token }) => !!token  // only allow if token exists (valid session)
    },
    pages: { 
      signIn: "/v2/auth/launch-app"       // redirect here if not authorized
    }
  }
);
export const config = { 
  matcher: ["/v2/quests/:path*", "/v2/stories/:path*", "/v2/dashboard/:path*", "/v2/routes/:path*"] 
};
