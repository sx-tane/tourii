interface FallbackError {
    message: string;
    error?: Error;
    [key: string]: unknown;
}

interface ErrorFallbackProps {
    error: Error | FallbackError;
    resetErrorBoundary?: () => void;
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
    const errorMessage = error instanceof Error ? error.message : error.message;

    return (
        <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
            <p className="mt-2 text-gray-600">{errorMessage}</p>
            {resetErrorBoundary && (
                <button
                    type="button"
                    onClick={resetErrorBoundary}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Try again
                </button>
            )}
        </div>
    );
}; 