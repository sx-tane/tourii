'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Spinner } from '../../components/Spinner';

interface Route {
    id: string;
    title: string;
    description: string;
    type: 'walking' | 'cycling' | 'public-transport';
    location: {
        name: string;
        prefecture: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    distance: {
        value: number;
        unit: 'km' | 'mi';
    };
    duration: {
        value: number;
        unit: 'minutes' | 'hours';
    };
    difficulty: 'easy' | 'moderate' | 'challenging';
    tags: string[];
    stops: {
        count: number;
        points: Array<{
            id: string;
            name: string;
            type: 'attraction' | 'rest' | 'transit' | 'other';
            coordinates: {
                lat: number;
                lng: number;
            };
        }>;
    };
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
    accessibility: {
        wheelchairFriendly: boolean;
        strollerFriendly: boolean;
        hasRestStops: boolean;
        publicTransportAccess: boolean;
    };
    seasonalInfo: {
        bestSeason: Array<'spring' | 'summer' | 'autumn' | 'winter'>;
        weatherConsiderations: string[];
    };
}

interface FilterState {
    type: Route['type'] | 'all';
    location: string | 'all';
    difficulty: Route['difficulty'] | 'all';
    searchQuery: string;
}

const RoutesPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated' && process.env.NODE_ENV !== 'development') {
            router.push('/login');
        }
    }, [status, router]);

    const [filters, setFilters] = useState<FilterState>({
        type: 'all',
        location: 'all',
        difficulty: 'all',
        searchQuery: '',
    });

    const [routes] = useState<Route[]>([
        {
            id: 'philosophers-path',
            title: "Philosopher's Path",
            description: "Follow the historic stone path through Kyoto's temple district, from Ginkaku-ji to Nanzen-ji.",
            type: 'walking',
            location: {
                name: 'Kyoto',
                prefecture: 'Kyoto',
                coordinates: {
                    lat: 35.027652,
                    lng: 135.794140
                }
            },
            distance: {
                value: 2.5,
                unit: 'km'
            },
            duration: {
                value: 90,
                unit: 'minutes'
            },
            difficulty: 'easy',
            tags: ['temples', 'nature', 'historical'],
            stops: {
                count: 7,
                points: [
                    {
                        id: 'ginkakuji',
                        name: 'Ginkaku-ji',
                        type: 'attraction',
                        coordinates: {
                            lat: 35.027100,
                            lng: 135.798400
                        }
                    },
                    {
                        id: 'nanzenji',
                        name: 'Nanzen-ji',
                        type: 'attraction',
                        coordinates: {
                            lat: 35.023900,
                            lng: 135.793600
                        }
                    }
                ]
            },
            rating: 4.8,
            reviewCount: 245,
            createdAt: '2024-03-01T00:00:00Z',
            updatedAt: '2024-03-01T00:00:00Z',
            accessibility: {
                wheelchairFriendly: true,
                strollerFriendly: true,
                hasRestStops: true,
                publicTransportAccess: true
            },
            seasonalInfo: {
                bestSeason: ['spring', 'autumn'],
                weatherConsiderations: ['Slippery when wet', 'Hot in summer']
            }
        },
        {
            id: 'arashiyama-cycle',
            title: 'Arashiyama Bamboo Circuit',
            description: 'Cycle through the famous bamboo grove and explore the western outskirts of Kyoto.',
            type: 'cycling',
            location: {
                name: 'Kyoto',
                prefecture: 'Kyoto',
                coordinates: {
                    lat: 35.027652,
                    lng: 135.794140
                }
            },
            distance: {
                value: 8,
                unit: 'km'
            },
            duration: {
                value: 180,
                unit: 'minutes'
            },
            difficulty: 'moderate',
            tags: ['bamboo-grove', 'nature', 'temples'],
            stops: {
                count: 5,
                points: [
                    {
                        id: 'arashiyama-bamboo-grove',
                        name: 'Arashiyama Bamboo Grove',
                        type: 'attraction',
                        coordinates: {
                            lat: 35.027652,
                            lng: 135.794140
                        }
                    },
                    {
                        id: 'arashiyama-temple',
                        name: 'Arashiyama Temple',
                        type: 'attraction',
                        coordinates: {
                            lat: 35.027652,
                            lng: 135.794140
                        }
                    }
                ]
            },
            rating: 4.6,
            reviewCount: 189,
            createdAt: '2024-03-05T00:00:00Z',
            updatedAt: '2024-03-05T00:00:00Z',
            accessibility: {
                wheelchairFriendly: false,
                strollerFriendly: false,
                hasRestStops: false,
                publicTransportAccess: true
            },
            seasonalInfo: {
                bestSeason: ['spring', 'autumn'],
                weatherConsiderations: ['Hot in summer']
            }
        },
        {
            id: 'fushimi-inari-trek',
            title: 'Fushimi Inari Mountain Trail',
            description: 'Trek through thousands of torii gates to the summit of Mount Inari.',
            type: 'walking',
            location: {
                name: 'Kyoto',
                prefecture: 'Kyoto',
                coordinates: {
                    lat: 35.027652,
                    lng: 135.794140
                }
            },
            distance: {
                value: 4.5,
                unit: 'km'
            },
            duration: {
                value: 180,
                unit: 'minutes'
            },
            difficulty: 'challenging',
            tags: ['shrines', 'mountain', 'torii-gates'],
            stops: {
                count: 4,
                points: [
                    {
                        id: 'fushimi-inari-shrine',
                        name: 'Fushimi Inari Shrine',
                        type: 'attraction',
                        coordinates: {
                            lat: 35.027652,
                            lng: 135.794140
                        }
                    },
                    {
                        id: 'mount-inari',
                        name: 'Mount Inari',
                        type: 'attraction',
                        coordinates: {
                            lat: 35.027652,
                            lng: 135.794140
                        }
                    }
                ]
            },
            rating: 4.9,
            reviewCount: 567,
            createdAt: '2024-03-10T00:00:00Z',
            updatedAt: '2024-03-10T00:00:00Z',
            accessibility: {
                wheelchairFriendly: false,
                strollerFriendly: false,
                hasRestStops: false,
                publicTransportAccess: false
            },
            seasonalInfo: {
                bestSeason: ['spring', 'autumn'],
                weatherConsiderations: ['Hot in summer']
            }
        },
    ]);

    const filteredRoutes = useMemo(() => {
        return routes.filter(route => {
            const matchesType = filters.type === 'all' || route.type === filters.type;
            const matchesLocation = filters.location === 'all' || route.location.name === filters.location;
            const matchesDifficulty = filters.difficulty === 'all' || route.difficulty === filters.difficulty;
            const matchesSearch = route.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                route.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                route.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()));

            return matchesType && matchesLocation && matchesDifficulty && matchesSearch;
        });
    }, [routes, filters]);

    const locations = [...new Set(routes.map(route => route.location.name))];

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
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
                            <option value="walking">Walking</option>
                            <option value="cycling">Cycling</option>
                            <option value="public-transport">Public Transport</option>
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
                        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                            Difficulty
                        </label>
                        <select
                            id="difficulty"
                            value={filters.difficulty}
                            onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value as FilterState['difficulty'] }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="all">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="moderate">Moderate</option>
                            <option value="challenging">Challenging</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            type="search"
                            id="search"
                            placeholder="Search routes..."
                            value={filters.searchQuery}
                            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Routes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRoutes.map((route) => (
                    <Link
                        key={route.id}
                        href={`/v2/routes/${route.id}`}
                        className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">{route.title}</h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded ${route.type === 'walking' ? 'bg-green-100 text-green-800' :
                                    route.type === 'cycling' ? 'bg-blue-100 text-blue-800' :
                                        'bg-purple-100 text-purple-800'
                                    }`}>
                                    {route.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">{route.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                                <div>
                                    <span className="block font-medium">Distance</span>
                                    {route.distance.value} {route.distance.unit}
                                </div>
                                <div>
                                    <span className="block font-medium">Duration</span>
                                    {route.duration.value} {route.duration.unit}
                                </div>
                                <div>
                                    <span className="block font-medium">Difficulty</span>
                                    <span className={`capitalize ${route.difficulty === 'easy' ? 'text-green-600' :
                                        route.difficulty === 'moderate' ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {route.difficulty}
                                    </span>
                                </div>
                                <div>
                                    <span className="block font-medium">Stops</span>
                                    {route.stops.count} locations
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <span className="flex items-center">
                                    <span className="text-yellow-400">★</span> {route.rating}
                                </span>
                                <span>•</span>
                                <span>{route.reviewCount} reviews</span>
                                <span>•</span>
                                <span>Added {formatDistanceToNow(new Date(route.createdAt), { addSuffix: true })}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {route.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                    >
                                        {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </span>
                                ))}
                            </div>
                            {route.accessibility.wheelchairFriendly && (
                                <div className="mt-4 text-sm text-green-600">
                                    ♿ Wheelchair accessible
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RoutesPage;
