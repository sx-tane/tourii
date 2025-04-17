'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { store } from '@/lib/redux/store';

// Mock session for development
const mockSession = {
    data: {
        user: {
            id: 'mock-user-id',
            name: 'Test User',
            email: 'test@example.com',
            image: null
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    status: 'authenticated'
};

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    // Use mock session during development
    if (process.env.NODE_ENV === 'development') {
        return (
            <SessionProvider session={mockSession.data}>
                <ReduxProvider store={store}>
                    {children}
                </ReduxProvider>
            </SessionProvider>
        );
    }

    // Use real session in production
    return (
        <SessionProvider>
            <ReduxProvider store={store}>
                {children}
            </ReduxProvider>
        </SessionProvider>
    );
} 