'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const errors: { [key: string]: string } = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link was invalid or has expired.",
    Default: "An error occurred during authentication."
};

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const errorMessage = error ? errors[error] || errors.Default : errors.Default;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Error</h2>
                        <p className="text-gray-600 mb-6">{errorMessage}</p>
                        <Link
                            href="/v2/auth/launch-app"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Try Again
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 