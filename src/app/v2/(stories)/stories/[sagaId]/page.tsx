'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import type { StorySaga, StoryChapter } from '../../types';

interface SagaDetailPageProps {
    params: {
        sagaId: string;
    };
}

const ChapterCard = ({ chapter, sagaId }: { chapter: StoryChapter; sagaId: string }) => {
    const statusColors = {
        locked: 'bg-gray-100 text-gray-800',
        unlocked: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
    };

    return (
        <Link
            href={`/v2/stories/${sagaId}/chapters/${chapter.id}`}
            className={`block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${chapter.status === 'locked' ? 'opacity-75 cursor-not-allowed' : ''
                }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-gray-900">{chapter.title}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[chapter.status]}`}>
                            {chapter.status.charAt(0).toUpperCase() + chapter.status.slice(1)}
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{chapter.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                            <span className="mr-2">⏱️</span>
                            {chapter.estimatedDuration}
                        </span>
                        {chapter.location && (
                            <span className="flex items-center">
                                <span className="mr-2">📍</span>
                                {chapter.location.name}
                            </span>
                        )}
                    </div>
                </div>
                {chapter.reward && (
                    <div className="flex items-center gap-1 text-indigo-600">
                        <span>{chapter.reward.icon}</span>
                        <span className="text-sm font-medium">{chapter.reward.value}</span>
                    </div>
                )}
            </div>
            {chapter.unlockConditions && chapter.status === 'locked' && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900">Requirements to unlock:</h4>
                    <ul className="mt-2 space-y-1">
                        {chapter.unlockConditions.points && (
                            <li className="text-sm text-gray-600">
                                • {chapter.unlockConditions.points} points needed
                            </li>
                        )}
                        {chapter.unlockConditions.badges?.map((badge, index) => (
                            <li key={badge} className="text-sm text-gray-600">
                                • Badge required: {badge}
                            </li>
                        ))}
                        {chapter.unlockConditions.completedQuests?.map((quest, index) => (
                            <li key={quest} className="text-sm text-gray-600">
                                • Complete quest: {quest}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Link>
    );
};

const SagaDetailPage = ({ params }: SagaDetailPageProps) => {
    const [saga] = useState<StorySaga>({
        id: 'kyoto-temples',
        title: 'Temples of Kyoto',
        description: 'Explore the ancient temples of Kyoto and discover their hidden stories.',
        status: 'published',
        coverImage: '/images/kyoto-temples.jpg',
        author: {
            id: 'author-1',
            name: 'Yuki Tanaka',
            avatar: '/images/avatars/yuki.jpg',
        },
        tags: ['culture', 'history', 'temples', 'kyoto'],
        category: 'Cultural Heritage',
        totalChapters: 5,
        completedChapters: 2,
        estimatedDuration: '3 hours',
        chapters: [
            {
                id: 'chapter-1',
                sagaId: 'kyoto-temples',
                title: 'The Golden Pavilion',
                description: 'Discover the history and legends of Kinkaku-ji.',
                status: 'completed',
                content: '...',
                estimatedDuration: '30 minutes',
                location: {
                    name: 'Kinkaku-ji',
                    coordinates: [35.0394, 135.7292],
                },
                reward: {
                    type: 'points',
                    value: '100',
                    icon: '🏆',
                },
                createdAt: '2024-03-01T00:00:00Z',
                updatedAt: '2024-03-18T11:00:00Z',
            },
            {
                id: 'chapter-2',
                sagaId: 'kyoto-temples',
                title: 'Zen Garden Mysteries',
                description: 'Explore the peaceful Ryoan-ji temple and its famous rock garden.',
                status: 'completed',
                content: '...',
                estimatedDuration: '45 minutes',
                location: {
                    name: 'Ryoan-ji',
                    coordinates: [35.0347, 135.7182],
                },
                reward: {
                    type: 'badge',
                    value: 'Zen Master',
                    icon: '🧘',
                },
                createdAt: '2024-03-01T00:00:00Z',
                updatedAt: '2024-03-18T11:00:00Z',
            },
            {
                id: 'chapter-3',
                sagaId: 'kyoto-temples',
                title: 'Pure Water Temple',
                description: 'Visit the famous Kiyomizu-dera and its pure water spring.',
                status: 'unlocked',
                content: '...',
                estimatedDuration: '1 hour',
                location: {
                    name: 'Kiyomizu-dera',
                    coordinates: [34.9948, 135.7847],
                },
                reward: {
                    type: 'points',
                    value: '150',
                    icon: '🏆',
                },
                createdAt: '2024-03-01T00:00:00Z',
                updatedAt: '2024-03-18T11:00:00Z',
            },
        ],
        createdAt: '2024-03-01T00:00:00Z',
        updatedAt: '2024-03-18T11:00:00Z',
    });

    return (
        <div className="space-y-6">
            {/* Saga Header */}
            <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                    src={saga.coverImage}
                    alt={saga.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-4 mb-2">
                        {saga.author.avatar && (
                            <Image
                                src={saga.author.avatar}
                                alt={saga.author.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-white">{saga.title}</h1>
                            <p className="text-sm text-gray-200">By {saga.author.name}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {saga.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs font-medium bg-black bg-opacity-50 text-white rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Saga Info */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <p className="text-gray-600">{saga.description}</p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <span className="block text-gray-500">Category</span>
                        <span className="font-medium">{saga.category}</span>
                    </div>
                    <div>
                        <span className="block text-gray-500">Duration</span>
                        <span className="font-medium">{saga.estimatedDuration}</span>
                    </div>
                    <div>
                        <span className="block text-gray-500">Progress</span>
                        <span className="font-medium">{saga.completedChapters}/{saga.totalChapters} chapters</span>
                    </div>
                    <div>
                        <span className="block text-gray-500">Last Updated</span>
                        <span className="font-medium">
                            {formatDistanceToNow(new Date(saga.updatedAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium text-gray-900">Story Progress</h2>
                    <span className="text-sm font-medium">
                        {Math.round((saga.completedChapters / saga.totalChapters) * 100)}% Complete
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${(saga.completedChapters / saga.totalChapters) * 100}%` }}
                    />
                </div>
            </div>

            {/* Chapters List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Chapters</h2>
                <div className="grid gap-4">
                    {saga.chapters.map((chapter) => (
                        <ChapterCard key={chapter.id} chapter={chapter} sagaId={saga.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SagaDetailPage;
