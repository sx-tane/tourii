"use client";

import { store } from "@/lib/redux/store";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

interface ProvidersProps {
	children: ReactNode;
}

/**
 * Application Providers
 * Provides authentication and state management context
 * SECURITY: Removed hardcoded authentication bypass
 */
export function Providers({ children }: ProvidersProps) {
	return (
		<SessionProvider>
			<ReduxProvider store={store}>{children}</ReduxProvider>
		</SessionProvider>
	);
}
