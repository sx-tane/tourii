// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { Account, NextAuthOptions, User, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    // 1. Email/Password Credentials Provider
    CredentialsProvider({
      id: "credentials",  // ID for signIn() calls
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Call Tourii backend to verify email/password
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.BACKEND_API_KEY!,       // include API key for backend auth:contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
            "x-api-version": process.env.BACKEND_API_VERSION || "1.0"
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });
        if (!res.ok) return null;
        const data = await res.json();
        // Expect backend to return user info and JWT tokens
        return {
          id: data.user.id,
          name: data.user.username,
          email: data.user.email,
          accessToken: data.accessToken,      // backend-issued JWT access token
          refreshToken: data.refreshToken     // backend-issued refresh token (if any)
        };
      }
    }),
    // 2. Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {           // request offline access and prompt selection
        params: { prompt: "select_account", access_type: "offline", response_type: "code" }
      }
      // Default scopes include email and profile. Google returns an id_token we can use.
    }),
    // 3. Discord OAuth Provider
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email" } } 
      // Ensure Discord returns the user's email in OAuth profile by requesting the "email" scope
    }),
    // 4. WalletConnect / Ethereum (custom Credentials Provider)
    CredentialsProvider({
      id: "wallet", 
      name: "Ethereum Wallet",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        signature: { label: "Signed Message", type: "text" }
      },
      async authorize(credentials) {
        // Verify the wallet signature with the backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-signature`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.BACKEND_API_KEY!,
            "x-api-version": process.env.BACKEND_API_VERSION || "1.0"
          },
          body: JSON.stringify({
            address: credentials?.address,
            signature: credentials?.signature
          })
        });
        if (!res.ok) return null;
        const data = await res.json();
        // If successful, backend returns the user (existing or newly created) and JWT
        return {
          id: data.user.id,
          name: data.user.username,
          email: data.user.email,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 15 * 60 // 15 minutes for access JWT (keep short, will use refresh token):contentReference[oaicite:2]{index=2}
  },
  callbacks: {
    /** JWT callback fires when a token is created or updated */
    async jwt({ token, user, account }: { token: JWT; user: User; account: Account | null; profile?: Profile; trigger?: "signIn" | "signUp" | "update"; isNewUser?: boolean; session?: any; }) {
      // On initial sign-in, attach returned tokens to the JWT
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      // If the JWT is expired or nearing expiry, attempt to refresh (using refreshToken)
      const accessToken = token.accessToken as string | undefined;
      const refreshToken = token.refreshToken as string | undefined;

      if (accessToken && refreshToken) {
        const payloadB64 = accessToken.split('.')[1];
        if (payloadB64) {
          try {
            const { exp } = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
            if (Date.now() / 1000 > exp - 60) {
              // Token expired or about to expire, refresh it
              const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-api-key": process.env.BACKEND_API_KEY!,
                  "x-api-version": process.env.BACKEND_API_VERSION || "1.0"
                },
                body: JSON.stringify({ refreshToken })
              });
              if (res.ok) {
                const data = await res.json();
                token.accessToken = data.accessToken;
                token.refreshToken = data.refreshToken;
              } else {
                console.warn("Refresh token invalid or expired");
              }
            }
          } catch (e) {
            if (e instanceof SyntaxError) {
                console.error("Failed to parse JWT payload:", e);
            } else {
                console.error("Refresh token request failed or other error during JWT processing:", e);
            }
          }
        } else {
            console.warn("Access token is not a valid JWT format (missing payload).");
        }
      }
      return token;
    },
    /** Session callback to expose fields to the client */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.accessToken = token.accessToken as string;
        // (Optionally include refresh token in session if needed on client; usually we keep it server-side only)
      }
      return session;
    },
    /** Optional: Link accounts by email automatically (if using NextAuth DB) */
    async signIn({ account, profile, user, email }) {
      // By delegating to backend, we rely on backend to handle linking. 
      // If using a NextAuth Adapter with a database, you could implement logic here to 
      // merge accounts with identical emails. (Not needed when using backend for linking)
      return true;
    }
  },
  // Specify custom pages if needed (we'll use our own routes)
  pages: {
    signIn: "/v2/auth/launch-app",        // custom login/register page:contentReference[oaicite:3]{index=3}
    error: "/v2/auth/error"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
