'use client';

import type { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface QuestsLayoutProps {
    children: ReactNode
}

const QuestsLayout = ({ children }: QuestsLayoutProps) => {
    const { data: session, status } = useSession()
    const isDevelopment = process.env.NODE_ENV === 'development'

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                <Link href="/v2/quests" className="hover:text-indigo-600">
                                    Quests
                                </Link>
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">Complete quests to earn rewards and unlock new stories</p>
                        </div>
                        {!isDevelopment && (
                            <div className="flex items-center space-x-4">
                                {status === 'loading' ? (
                                    <div className="animate-pulse h-8 w-20 bg-gray-200 rounded" />
                                ) : session ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">Welcome, {session.user?.name}</span>
                                        <Link
                                            href="/api/auth/signout"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Sign Out
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href="/auth/login"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/auth/register"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    )
}

export default QuestsLayout
