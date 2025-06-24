"use client";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Lock, LogIn } from "lucide-react";
import type { ReactNode } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ConditionalFeaturesProps {
  publicContent: ReactNode;
  authenticatedContent: ReactNode;
  signInPrompt?: string;
  className?: string;
}

/**
 * Conditional Features Component
 * Implements hybrid public/private model - shows content to everyone
 * but enhanced features only to authenticated users
 */
export function ConditionalFeatures({
  publicContent,
  authenticatedContent,
  signInPrompt = "Sign in to unlock enhanced features!",
  className = ""
}: ConditionalFeaturesProps) {
  const { data: session, status } = useSession();

  return (
    <div className={className}>
      {/* Public content - always visible */}
      {publicContent}
      
      {/* Conditional enhanced features */}
      {status === "loading" ? (
        <div className="my-6">
          <LoadingSpinner size="sm" text="Loading authentication..." />
        </div>
      ) : session ? (
        /* Authenticated content */
        authenticatedContent
      ) : (
        /* Sign-in prompt for unauthenticated users */
        <SignInPrompt message={signInPrompt} />
      )}
    </div>
  );
}

interface SignInPromptProps {
  message: string;
  variant?: "default" | "minimal" | "card";
}

/**
 * Sign-in prompt component for hybrid features
 */
export function SignInPrompt({ 
  message, 
  variant = "default" 
}: SignInPromptProps) {
  if (variant === "minimal") {
    return (
      <div className="text-center py-4">
        <p className="text-warmGrey text-sm mb-3">{message}</p>
        <Button
          onClick={() => signIn()}
          variant="outline"
          size="sm"
          className="text-red border-red hover:bg-red hover:text-white"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="bg-warmGrey1 rounded-lg p-6 text-center my-6">
        <Lock className="h-8 w-8 text-warmGrey mx-auto mb-3" />
        <p className="text-charcoal font-medium mb-2">Enhanced Features Available</p>
        <p className="text-warmGrey text-sm mb-4">{message}</p>
        <Button
          onClick={() => signIn()}
          className="bg-red hover:bg-red/90 text-white"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In to Continue
        </Button>
      </div>
    );
  }

  // Default variant
  return (
    <div className="border-2 border-dashed border-warmGrey2 rounded-lg p-8 text-center my-6">
      <Lock className="h-12 w-12 text-warmGrey mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-charcoal mb-2">
        Unlock Premium Features
      </h3>
      <p className="text-warmGrey mb-6">{message}</p>
      <Button
        onClick={() => signIn()}
        className="bg-red hover:bg-red/90 text-white font-semibold px-6 py-3"
      >
        <LogIn className="h-5 w-5 mr-2" />
        Sign In with Google
      </Button>
      <p className="text-xs text-warmGrey mt-3">
        Free account • No credit card required
      </p>
    </div>
  );
}