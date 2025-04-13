'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface Story {
    id: string;
    title: string;
    description: string;
    type: 'folk' | 'historical' | 'cultural';
    location: string;
    readTime: string;
    publishedAt: string;
    tags: string[];
    thumbnail?: string;
    progress?: number;
}

interface FilterState {
    type: Story['type'] | 'all';
    location: string | 'all';
    searchQuery: string;
}

const StoriesPage = () => {
    const [filters, setFilters] = useState<FilterState>({
        type: 'all',
        location: 'all',
        searchQuery: '',
    });

    const [stories] = useState<Story[]>([
        {
            id: 'kitsune-wedding',
            title: "The Fox's Wedding",
            description: "Discover the enchanting tale of the mysterious fox wedding ceremony, a phenomenon in Japanese folklore where rain falls from a clear sky.",
            type: 'folk',
            location: 'Kyoto',
            readTime: '10 min',
            publishedAt: '2024-03-15T10:00:00Z',
            tags: ['folklore', 'supernatural', 'nature'],
            progress: 0.3,
        },
        {
            id: 'gion-festival',
            title: 'Gion Festival History',
            description: "Explore the rich history of Kyoto's largest festival, dating back to 869 AD as a purification ritual.",
            type: 'historical',
            location: 'Kyoto',
            readTime: '15 min',
            publishedAt: '2024-03-10T14:30:00Z',
            tags: ['festival', 'tradition', 'history'],
            progress: 0.7,
        },
        {
            id: 'tea-ceremony',
            title: 'The Way of Tea',
            description: "Learn about the profound cultural significance and intricate rituals of the Japanese tea ceremony.",
            type: 'cultural',
            location: 'Kyoto',
            readTime: '12 min',
            publishedAt: '2024-03-05T09:15:00Z',
            tags: ['tradition', 'culture', 'ritual'],
            progress: 1,
        },
    ]);

    const filteredStories = useMemo(() => {
        return stories.filter(story => {
            const matchesType = filters.type === 'all' || story.type === filters.type;
            const matchesLocation = filters.location === 'all' || story.location === filters.location;
            const matchesSearch = story.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                story.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                story.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()));

            return matchesType && matchesLocation && matchesSearch;
        });
    }, [stories, filters]);

    const locations = [...new Set(stories.map(story => story.location))];

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select
                            id="type"
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as FilterState['type'] }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="all">All Types</option>
                            <option value="folk">Folk Tales</option>
                            <option value="historical">Historical</option>
                            <option value="cultural">Cultural</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <select
                            id="location"
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="all">All Locations</option>
                            {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            type="search"
                            id="search"
                            placeholder="Search stories..."
                            value={filters.searchQuery}
                            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                    <Link
                        key={story.id}
                        href={`/v2/stories/${story.id}`}
                        className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">{story.title}</h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded ${story.type === 'folk' ? 'bg-purple-100 text-purple-800' :
                                    story.type === 'historical' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                    {story.type}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">{story.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{story.readTime}</span>
                                <span>{formatDistanceToNow(new Date(story.publishedAt), { addSuffix: true })}</span>
                            </div>
                            {story.progress !== undefined && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Progress</span>
                                        <span className="font-medium">{Math.round(story.progress * 100)}%</span>
                                    </div>
                                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                                            style={{ width: `${story.progress * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-2 mt-4">
                                {story.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StoriesPage;
