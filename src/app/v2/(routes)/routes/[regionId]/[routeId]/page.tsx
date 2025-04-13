'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface RouteDetailPageProps {
    params: {
        regionId: string;
        routeId: string;
    };
}

interface RouteStop {
    id: string;
    name: string;
    description: string;
    type: 'attraction' | 'temple' | 'shrine' | 'restaurant' | 'rest-area';
    duration: string;
    order: number;
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface Route {
    id: string;
    title: string;
    description: string;
    type: 'walking' | 'cycling' | 'public-transport';
    location: string;
    distance: string;
    duration: string;
    difficulty: 'easy' | 'moderate' | 'challenging';
    tags: string[];
    stops: RouteStop[];
    rating: number;
    reviewCount: number;
    createdAt: string;
    startPoint: {
        name: string;
        description: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    endPoint: {
        name: string;
        description: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    tips: string[];
    amenities: {
        restrooms: boolean;
        waterFountains: boolean;
        restaurants: boolean;
        parking: boolean;
        publicTransport: boolean;
    };
}

const RouteDetailPage = ({ params }: RouteDetailPageProps) => {
    const router = useRouter();
    const [route] = useState<Route>({
        id: 'philosophers-path',
        title: "Philosopher's Path",
        description: "Follow the historic stone path through Kyoto's temple district, from Ginkaku-ji to Nanzen-ji. This peaceful walk takes you along a cherry-tree-lined canal, past numerous small temples and through the heart of Kyoto's cultural heritage.",
        type: 'walking',
        location: 'Kyoto',
        distance: '2.5 km',
        duration: '1-2 hours',
        difficulty: 'easy',
        tags: ['temples', 'nature', 'historical'],
        rating: 4.8,
        reviewCount: 245,
        createdAt: '2024-03-01T00:00:00Z',
        startPoint: {
            name: 'Ginkaku-ji Temple',
            description: 'The Silver Pavilion, a Zen temple at the northern end of the path',
            coordinates: {
                lat: 35.027103,
                lng: 135.798374,
            },
        },
        endPoint: {
            name: 'Nanzen-ji Temple',
            description: 'A major Zen temple featuring impressive gates and gardens',
            coordinates: {
                lat: 35.023611,
                lng: 135.794722,
            },
        },
        stops: [
            {
                id: 'honen-in',
                name: 'Honen-in Temple',
                description: 'A serene temple with moss gardens and thatched gate',
                type: 'temple',
                duration: '20-30 min',
                order: 1,
                coordinates: {
                    lat: 35.026389,
                    lng: 135.797778,
                },
            },
            {
                id: 'otoya',
                name: 'Otoya Restaurant',
                description: 'Traditional Japanese restaurant with garden views',
                type: 'restaurant',
                duration: '30-60 min',
                order: 2,
                coordinates: {
                    lat: 35.025556,
                    lng: 135.796944,
                },
            },
            {
                id: 'eikan-do',
                name: 'Eikan-do Temple',
                description: 'Famous for autumn colors and unique architecture',
                type: 'temple',
                duration: '45-60 min',
                order: 3,
                coordinates: {
                    lat: 35.024722,
                    lng: 135.795833,
                },
            },
        ],
        tips: [
            'Best visited during cherry blossom season (late March to early April) or autumn (November)',
            'Start early to avoid crowds, especially on weekends',
            'Many shops along the path are closed on Wednesdays',
            'Bring cash as some smaller shops do not accept cards',
        ],
        amenities: {
            restrooms: true,
            waterFountains: true,
            restaurants: true,
            parking: false,
            publicTransport: true,
        },
    });

    return (
        <div className="space-y-6">
            {/* Route Header */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        ← Back to Routes
                    </button>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${route.type === 'walking' ? 'bg-green-100 text-green-800' :
                        route.type === 'cycling' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                        }`}>
                        {route.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{route.title}</h1>
                <p className="text-gray-600 mb-4">{route.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div>
                        <span className="block font-medium">Distance</span>
                        {route.distance}
                    </div>
                    <div>
                        <span className="block font-medium">Duration</span>
                        {route.duration}
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
                        <span className="block font-medium">Rating</span>
                        <span className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            {route.rating} ({route.reviewCount} reviews)
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    {route.tags.map(tag => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                            {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                    ))}
                </div>
            </div>

            {/* Map View */}
            <div className="bg-white shadow-sm rounded-lg p-4">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
                    <div className="flex items-center justify-center">
                        <span className="text-gray-400">Interactive Map Coming Soon</span>
                    </div>
                </div>
            </div>

            {/* Route Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start and End Points */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Start & End Points</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-gray-900">Start: {route.startPoint.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{route.startPoint.description}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">End: {route.endPoint.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">{route.endPoint.description}</p>
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(route.amenities).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                                <span className={`mr-2 ${value ? 'text-green-500' : 'text-red-500'}`}>
                                    {value ? '✓' : '×'}
                                </span>
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stops */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Route Stops</h2>
                <div className="space-y-6">
                    {route.stops.map((stop, index) => (
                        <div key={stop.id} className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                                {index + 1}
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-lg font-medium text-gray-900">{stop.name}</h3>
                                <p className="mt-1 text-gray-600">{stop.description}</p>
                                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="capitalize">{stop.type}</span>
                                    <span>•</span>
                                    <span>{stop.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Travel Tips</h2>
                <ul className="space-y-2">
                    {route.tips.map((tip) => (
                        <li key={tip} className="flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            <span className="text-gray-600">{tip}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                >
                    Start Navigation
                </button>
                <button
                    type="button"
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
                >
                    Save Route
                </button>
            </div>
        </div>
    );
};

export default RouteDetailPage;
