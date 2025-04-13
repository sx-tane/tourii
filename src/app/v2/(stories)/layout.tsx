import type { ReactNode } from 'react'

interface StoriesLayoutProps {
    children: ReactNode
}

const StoriesLayout = ({ children }: StoriesLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Stories</h1>
                    <p className="mt-1 text-sm text-gray-500">Discover and explore Japanese folklore, history, and culture through immersive stories</p>
                </div>
            </div>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    )
}

export default StoriesLayout
