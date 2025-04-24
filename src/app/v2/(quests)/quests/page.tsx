'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import type { QuestType, QuestDifficulty, Quest } from '../types';
import { logger } from '../../../../utils/logger';
import Loading from '@/app/loading';

interface FilterState {
    type: QuestType | 'all';
    location: string | 'all';
    reward: string | 'all';
    difficulty: QuestDifficulty | 'all';
    searchQuery: string;
}

const QuestsPage = () => {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        type: 'all',
        location: 'all',
        reward: 'all',
        difficulty: 'all',
        searchQuery: '',
    });

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/quests');

                if (!response.ok) {
                    throw new Error('Failed to fetch quests');
                }

                const data = await response.json();
                setQuests(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
                setError('Failed to load quests. Please try again later.');
                logger.error('Error fetching quests:', errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuests();
    }, []);

    const filteredQuests = useMemo(() => {
        return quests.filter(quest => {
            const matchesType = filters.type === 'all' || quest.type === filters.type;
            const matchesLocation = filters.location === 'all' || quest.location === filters.location;
            const matchesReward = filters.reward === 'all' || quest.reward.type === filters.reward;
            const matchesDifficulty = filters.difficulty === 'all' || quest.difficulty === filters.difficulty;
            const matchesSearch = filters.searchQuery === '' ||
                quest.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                quest.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                quest.tags?.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()));

            return matchesType && matchesLocation && matchesReward && matchesDifficulty && matchesSearch;
        });
    }, [quests, filters]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-4">{error}</div>
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white shadow-sm rounded-lg p-4">
                <div className="max-w-xl">
                    <label htmlFor="search" className="sr-only">Search quests</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">🔍</span>
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search quests by title, description, or tags"
                            value={filters.searchQuery}
                            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white shadow-sm rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                            Quest Type
                        </label>
                        <select
                            id="type"
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as QuestType | 'all' }))}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                        >
                            <option value="all">All Types</option>
                            <option value="EARN_TO_TRAVEL">Earn to Travel</option>
                            <option value="TRAVEL_TO_EARN">Travel to Earn</option>
                            <option value="CULTURAL_COMMUNITY">Cultural Community</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <select
                            id="location"
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                        >
                            <option value="all">All Locations</option>
                            <option value="Kyoto">Kyoto</option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Osaka">Osaka</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="reward" className="block text-sm font-medium text-gray-700 mb-1">
                            Reward Type
                        </label>
                        <select
                            id="reward"
                            value={filters.reward}
                            onChange={(e) => setFilters(prev => ({ ...prev, reward: e.target.value }))}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                        >
                            <option value="all">All Rewards</option>
                            <option value="UNKNOWN">Points</option>
                            <option value="CULTURAL_COMMUNITY">Cultural</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                            Difficulty
                        </label>
                        <select
                            id="difficulty"
                            value={filters.difficulty}
                            onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value as QuestDifficulty | 'all' }))}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                        >
                            <option value="all">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Quests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredQuests.length === 0 ? (
                    <div className="col-span-2 text-center py-12 text-gray-500">
                        No quests found matching your filters.
                    </div>
                ) : (
                    filteredQuests.map((quest) => (
                        <Link
                            key={quest.id}
                            href={`/v2/quests/${quest.id}`}
                            className="block bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{quest.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{quest.description}</p>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {quest.type}
                                    </span>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <div className="flex items-center text-gray-500">
                                        <span>📍</span>
                                        <span className="ml-1">{quest.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <span>{quest.reward.icon}</span>
                                        <span className="ml-1">{quest.reward.value}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Progress</span>
                                        <span>{quest.progress}/{quest.totalTasks}</span>
                                    </div>
                                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full"
                                            style={{ width: `${(quest.progress / quest.totalTasks) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                    <span>Due {formatDistanceToNow(new Date(quest.deadline), { addSuffix: true })}</span>
                                    <span className={`px-2 py-1 rounded-full ${quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                        quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {quest.difficulty}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default QuestsPage;
