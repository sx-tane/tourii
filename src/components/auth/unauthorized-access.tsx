"use client";

import { AlertTriangle, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import type { UserRole } from "@/lib/auth/types";

interface UnauthorizedAccessProps {
  requiredRole?: UserRole;
  message?: string;
  showSignIn?: boolean;
}

export function UnauthorizedAccess({
  requiredRole,
  message,
  showSignIn = true,
}: UnauthorizedAccessProps) {
  const getRoleMessage = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "Administrator access required";
      case "MODERATOR":
        return "Moderator access required";
      default:
        return "User authentication required";
    }
  };

  const getIcon = (role?: UserRole) => {
    switch (role) {
      case "ADMIN":
        return <ShieldAlert className="h-16 w-16 text-red" />;
      case "MODERATOR":
        return <AlertTriangle className="h-16 w-16 text-mustard" />;
      default:
        return <Lock className="h-16 w-16 text-warmGrey" />;
    }
  };

  const defaultMessage = requiredRole 
    ? getRoleMessage(requiredRole)
    : "Authentication required to access this content";

  return (
    <div className="min-h-screen flex items-center justify-center bg-warmGrey1 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          {getIcon(requiredRole)}
        </div>
        
        <h1 className="text-2xl font-bold text-charcoal mb-4">
          Access Restricted
        </h1>
        
        <p className="text-warmGrey text-base mb-6">
          {message || defaultMessage}
        </p>

        {requiredRole && (
          <div className="bg-warmGrey1 rounded-lg p-4 mb-6">
            <p className="text-sm text-warmGrey">
              Required Role: <span className="font-semibold text-charcoal">{requiredRole}</span>
            </p>
          </div>
        )}

        {showSignIn && !requiredRole && (
          <div className="space-y-3">
            <Button
              onClick={() => signIn()}
              className="w-full bg-red hover:bg-red/90 text-white font-semibold py-3"
            >
              Sign In to Continue
            </Button>
            <p className="text-xs text-warmGrey">
              Sign in with your Google account or credentials
            </p>
          </div>
        )}

        {requiredRole && (
          <div className="text-xs text-warmGrey">
            Contact an administrator if you believe you should have access to this content.
          </div>
        )}
      </div>
    </div>
  );
}