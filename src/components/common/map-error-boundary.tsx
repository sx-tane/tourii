"use client";

import React from "react";
import { logger } from "@/utils/logger";

interface MapErrorBoundaryState {
	hasError: boolean;
	error?: Error;
	errorInfo?: React.ErrorInfo;
}

interface MapErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ComponentType<{ error?: Error }>;
}

class MapErrorBoundary extends React.Component<
	MapErrorBoundaryProps,
	MapErrorBoundaryState
> {
	constructor(props: MapErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): MapErrorBoundaryState {
		// Update state so the next render will show the fallback UI
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Log the error with context
		logger.error("Map component error caught by boundary:", {
			error: error.message,
			stack: error.stack,
			componentStack: errorInfo.componentStack,
		});

		this.setState({
			hasError: true,
			error,
			errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			// Render custom fallback UI or default
			const FallbackComponent = this.props.fallback || DefaultMapErrorFallback;
			return <FallbackComponent error={this.state.error} />;
		}

		return this.props.children;
	}
}

// Default fallback component for map errors
const DefaultMapErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
	return (
		<div className="h-full w-full bg-warmGrey border border-charcoal rounded-lg flex flex-col items-center justify-center p-8 text-center">
			<div className="text-4xl mb-4">🗺️</div>
			<h3 className="text-lg font-semibold text-charcoal mb-2">
				Map Unavailable
			</h3>
			<p className="text-sm text-gray-600 mb-4">
				We're having trouble loading the map. Please try refreshing the page.
			</p>
			{process.env.NODE_ENV === "development" && error && (
				<details className="text-xs text-red-600 mt-2">
					<summary className="cursor-pointer">Error Details (Dev Only)</summary>
					<pre className="mt-2 p-2 bg-red-50 rounded text-left overflow-auto">
						{error.message}
					</pre>
				</details>
			)}
			<button
				onClick={() => window.location.reload()}
				className="mt-4 px-4 py-2 bg-red text-white rounded hover:bg-red/90 transition-colors"
			>
				Refresh Page
			</button>
		</div>
	);
};

export default MapErrorBoundary;
