"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import type { AuthGuardProps, UserRole } from "@/lib/auth/types";
import { hasRequiredRole } from "@/lib/auth/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { UnauthorizedAccess } from "./unauthorized-access";

/**
 * Authentication Guard Component
 * Protects routes and components based on authentication and role requirements
 */
export function AuthGuard({
  children,
  requiredRole,
  fallback,
  redirectTo,
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated users if specified
    if (status === "unauthenticated" && redirectTo) {
      router.push(redirectTo);
    }
  }, [status, redirectTo, router]);

  // Loading state
  if (status === "loading") {
    return <LoadingSpinner className="min-h-screen" />;
  }

  // Unauthenticated state
  if (status === "unauthenticated") {
    if (redirectTo) {
      return <LoadingSpinner className="min-h-screen" />; // Will redirect
    }
    return fallback || <UnauthorizedAccess />;
  }

  // Role-based access control
  if (requiredRole && session?.user) {
    const user = session.user as any; // Type assertion for role access
    const hasAccess = hasRequiredRole(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role || "USER",
      },
      requiredRole
    );

    if (!hasAccess) {
      return fallback || <UnauthorizedAccess requiredRole={requiredRole} />;
    }
  }

  // Authenticated and authorized
  return <>{children}</>;
}

/**
 * Higher-order component for page-level protection
 */
export function withAuthGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  guardProps?: Omit<AuthGuardProps, "children">
) {
  const GuardedComponent = (props: P) => {
    return (
      <AuthGuard {...guardProps}>
        <WrappedComponent {...props} />
      </AuthGuard>
    );
  };

  GuardedComponent.displayName = `withAuthGuard(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return GuardedComponent;
}

/**
 * Hook for component-level authentication checks
 */
export function useAuthGuard(requiredRole?: UserRole) {
  const { data: session, status } = useSession();
  
  const isAuthenticated = status === "authenticated" && !!session?.user;
  const isLoading = status === "loading";
  
  const hasAccess = requiredRole && session?.user
    ? hasRequiredRole(
        {
          id: (session.user as any).id,
          email: session.user.email || "",
          name: session.user.name || "",
          image: session.user.image,
          role: (session.user as any).role || "USER",
        },
        requiredRole
      )
    : true;

  return {
    isAuthenticated,
    isLoading,
    hasAccess,
    user: session?.user || null,
    session,
  };
}