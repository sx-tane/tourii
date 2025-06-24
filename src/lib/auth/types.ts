// Authentication types for the ultimate authentication system

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: UserRole;
  level?: number;
  digitalPassportType?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

export type UserRole = "USER" | "ADMIN" | "MODERATOR";

export interface AuthSession {
  user: AuthUser;
  accessToken?: string;
  expires: string;
}

export interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export interface UseAuthResult {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: UserRole) => boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface SessionHookResult {
  session: AuthSession | null;
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}