import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.GOOGLE_CLIENT_ID) {
	throw new Error("Missing GOOGLE_CLIENT_ID");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
	throw new Error("Missing GOOGLE_CLIENT_SECRET");
}

if (!process.env.NEXTAUTH_SECRET) {
	throw new Error("Missing NEXTAUTH_SECRET");
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// This is a mock user - in production, you would check against your database
				const mockUsers = [
					{
						id: "1",
						name: "Test User",
						email: "test@example.com",
						password: "password123",
					},
					{
						id: "2",
						name: "Demo User",
						email: "demo@example.com",
						password: "demo123",
					},
				];

				const user = mockUsers.find(
					(user) =>
						user.email === credentials?.email &&
						user.password === credentials?.password,
				);

				if (user) {
					return {
						id: user.id,
						name: user.name,
						email: user.email,
					};
				}

				return null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "select_account",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
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
		async jwt({ token, account, profile }) {
			if (account) {
				token.accessToken = account.access_token;
				// You can add additional user data to the token here
				// token.userData = profile;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub as string;
				session.accessToken = token.accessToken as string;
				// You can add additional user data to the session here
				// session.user.userData = token.userData;
			}
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Allow relative URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allow URLs from same origin
			if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	debug: process.env.NODE_ENV === "development",
};
