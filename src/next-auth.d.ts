import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as NextAuthJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
    providerAccountId?: string;
  }

  interface Session extends DefaultSession {
    accessToken?: string;
    user?: {
      id?: string;
      provider?: string;
      providerAccountId?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    accessToken?: string;
    refreshToken?: string;
    // id is typically stored in 'sub' (subject) claim
    provider?: string;
    providerAccountId?: string;
  }
}
