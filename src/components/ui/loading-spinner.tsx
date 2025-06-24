"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function LoadingSpinner({ 
  className,
  size = "md",
  text = "Loading..."
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-4",
      className
    )}>
      <Loader2 className={cn(
        "animate-spin text-red",
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-warmGrey text-sm font-medium">{text}</p>
      )}
    </div>
  );
}