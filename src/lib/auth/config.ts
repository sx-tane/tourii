import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getRequiredEnvVar, generateUserId } from "./utils";
import type { AuthUser, UserRole } from "./types";

/**
 * Enhanced authentication configuration
 * Removes hardcoded credentials and implements proper user management
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getRequiredEnvVar("GOOGLE_CLIENT_ID"),
      clientSecret: getRequiredEnvVar("GOOGLE_CLIENT_SECRET"),
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Only include credentials provider in development
    ...(process.env.NODE_ENV === "development" ? [
      CredentialsProvider({
        name: "Development Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          // Development-only authentication
          // In production, this should integrate with your user database
          if (
            credentials?.email === "admin@tourii.dev" && 
            credentials?.password === "dev-admin-2024"
          ) {
            return {
              id: "dev-admin-001",
              name: "Development Admin",
              email: "admin@tourii.dev",
              role: "ADMIN",
            };
          }
          
          if (
            credentials?.email === "user@tourii.dev" && 
            credentials?.password === "dev-user-2024"
          ) {
            return {
              id: "dev-user-001", 
              name: "Development User",
              email: "user@tourii.dev",
              role: "USER",
            };
          }

          return null;
        },
      })
    ] : []),
  ],
  secret: getRequiredEnvVar("NEXTAUTH_SECRET"),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/v2/auth/launch-app",
    signOut: "/v2/auth/launch-app", 
    error: "/v2/auth/error",
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // First time user signs in
      if (account && user) {
        token.accessToken = account.access_token;
        
        // Generate stable user ID for new users
        if (!user.id || user.id.length < 10) {
          token.sub = generateUserId();
        }
        
        // Set default role for new users
        const userRole = await getUserRole(user.email || "");
        token.role = userRole;
        
        // Store additional user data
        token.level = await getUserLevel(token.sub || "");
        token.digitalPassportType = await getDigitalPassportType(token.sub || "");
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.accessToken = token.accessToken as string;
        
        // Add role and additional data to session
        (session.user as any).role = token.role;
        (session.user as any).level = token.level;
        (session.user as any).digitalPassportType = token.digitalPassportType;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allow URLs from same origin  
      if (new URL(url).origin === baseUrl) return url;
      // Default redirect to dashboard for authenticated users
      return `${baseUrl}/v2/dashboard`;
    },
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Log successful sign-ins (production monitoring)
      console.log(`User signed in: ${user.email} (${account?.provider})`);
      
      // Handle new user registration
      if (isNewUser && user.email) {
        // Here you would typically create user in your database
        // await createUserInDatabase(user);
      }
    },
    async signOut({ token }) {
      // Log sign-outs
      console.log(`User signed out: ${token.email}`);
    },
  },
};

/**
 * Get user role based on email or database lookup
 * In production, this should query your user database
 */
async function getUserRole(email: string): Promise<UserRole> {
  // Default role assignment logic
  // In production, query your database for user role
  
  // Admin emails (configure in environment variables)
  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim());
  if (adminEmails.includes(email)) {
    return "ADMIN";
  }
  
  // Moderator emails (configure in environment variables)
  const moderatorEmails = (process.env.MODERATOR_EMAILS || "").split(",").map(e => e.trim());
  if (moderatorEmails.includes(email)) {
    return "MODERATOR";
  }
  
  // Default to USER role
  return "USER";
}

/**
 * Get user level (for gamification)
 * In production, this should query your database
 */
async function getUserLevel(userId: string): Promise<number> {
  // Default level for new users
  // In production, query your database for user level
  return 1;
}

/**
 * Get digital passport type
 * In production, this should query your database
 */
async function getDigitalPassportType(userId: string): Promise<string | undefined> {
  // In production, query your database for user's passport type
  return undefined;
}