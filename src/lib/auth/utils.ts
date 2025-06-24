import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import type { AuthUser, UserRole, AuthSession } from "./types";
import { NextRequest } from "next/server";

/**
 * Server-side session utilities for API routes
 */
export async function getSessionUser(request?: NextRequest): Promise<AuthUser | null> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return null;
    }

    // Map session user to AuthUser interface
    const authUser: AuthUser = {
      id: session.user.id || "",
      email: session.user.email || "",
      name: session.user.name || "",
      image: session.user.image,
      role: (session.user as any).role || "USER",
      level: (session.user as any).level,
      digitalPassportType: (session.user as any).digitalPassportType,
    };

    return authUser;
  } catch (error) {
    console.error("Error getting session user:", error);
    return null;
  }
}

/**
 * Get user ID from session - safe for API routes
 */
export async function getSessionUserId(): Promise<string | null> {
  const user = await getSessionUser();
  return user?.id || null;
}

/**
 * Check if user has required role
 */
export function hasRequiredRole(user: AuthUser | null, requiredRole: UserRole): boolean {
  if (!user) return false;
  
  const roleHierarchy: Record<UserRole, number> = {
    USER: 1,
    MODERATOR: 2,
    ADMIN: 3,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

/**
 * Validate user session and role for API routes
 */
export async function validateUserAccess(requiredRole: UserRole = "USER"): Promise<{
  success: boolean;
  user: AuthUser | null;
  error?: string;
}> {
  const user = await getSessionUser();

  if (!user) {
    return {
      success: false,
      user: null,
      error: "Authentication required",
    };
  }

  if (!hasRequiredRole(user, requiredRole)) {
    return {
      success: false,
      user,
      error: `Access denied. Required role: ${requiredRole}`,
    };
  }

  return {
    success: true,
    user,
  };
}

/**
 * Generate secure user ID (for new users)
 */
export function generateUserId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  const prefix = "TSU";
  const year = new Date().getFullYear().toString();
  
  return `${prefix}${year}-${timestamp}-${random}`;
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * Safe environment variable access
 */
export function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}