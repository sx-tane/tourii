'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StoryChapter } from '../../../../types';
import { formatDistanceToNow } from 'date-fns';

interface ChapterDetailPageProps {
    params: {
        sagaId: string;
        chapterId: string;
    };
}

const ChapterDetailPage = ({ params }: ChapterDetailPageProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [chapter] = useState<StoryChapter>({
        id: 'chapter-1',
        sagaId: 'kyoto-temples',
        title: 'The Golden Pavilion',
        description: 'Discover the history and legends of Kinkaku-ji.',
        status: 'unlocked',
        content: `
# The Golden Pavilion (金閣寺, Kinkaku-ji)

Kinkaku-ji, also known as the Golden Pavilion, is one of Kyoto's most iconic landmarks. Originally built in 1397 as a retirement villa for Shogun Ashikaga Yoshimitsu, it was later converted into a Zen temple.

## The Architecture

The pavilion is a three-story building, each floor representing a different style of architecture:
1. Shinden-zukuri - The first floor, in the style of Heian imperial aristocracy
2. Samurai style - The second floor, representing warrior aristocracy
3. Zen temple style - The top floor, embodying Buddhist purity

The top two floors are completely covered in gold leaf, creating a stunning reflection in the mirror pond below.

## Historical Significance

The current building is actually a reconstruction from 1955, after the original was burned down in 1950 by a monk. The incident was later immortalized in Yukio Mishima's novel "The Temple of the Golden Pavilion."

## The Gardens

The stroll garden surrounding the pavilion is a classic example of Muromachi period garden design. As you walk through, you'll discover:
- The Mirror Pond (Kyōko-chi)
- Various stone arrangements
- Small islands
- Tea houses

## Cultural Impact

The temple is one of seventeen locations making up the Historic Monuments of Ancient Kyoto UNESCO World Heritage site. It continues to serve as a symbol of Kyoto's rich cultural heritage and architectural excellence.
        `,
        estimatedDuration: '30 minutes',
        location: {
            name: 'Kinkaku-ji',
            coordinates: [35.0394, 135.7292],
            address: '1 Kinkakujicho, Kita Ward, Kyoto, 603-8361, Japan',
        },
        reward: {
            type: 'points',
            value: '100',
            icon: '🏆',
        },
        media: [
            {
                type: 'image',
                url: '/images/kinkakuji-1.jpg',
                thumbnailUrl: '/images/kinkakuji-1-thumb.jpg',
            },
            {
                type: 'image',
                url: '/images/kinkakuji-2.jpg',
                thumbnailUrl: '/images/kinkakuji-2-thumb.jpg',
            },
        ],
        createdAt: '2024-03-01T00:00:00Z',
        updatedAt: '2024-03-18T11:00:00Z',
    });

    const handleComplete = async () => {
        setIsSubmitting(true);
        try {
            // TODO: Implement API call to complete chapter
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
            router.refresh();
            router.push(`/v2/stories/${params.sagaId}`);
        } catch (error) {
            console.error('Failed to complete chapter:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Chapter Header */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            ← Back to Story
                        </button>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${chapter.status === 'completed' ? 'bg-green-100 text-green-800' :
                            chapter.status === 'unlocked' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {chapter.status.charAt(0).toUpperCase() + chapter.status.slice(1)}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{chapter.title}</h1>
                    <p className="mt-2 text-lg text-gray-600">{chapter.description}</p>
                </div>

                {/* Chapter Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <span className="block text-gray-500">Duration</span>
                        <span className="font-medium">{chapter.estimatedDuration}</span>
                    </div>
                    {chapter.location && (
                        <div>
                            <span className="block text-gray-500">Location</span>
                            <span className="font-medium">{chapter.location.name}</span>
                        </div>
                    )}
                    <div>
                        <span className="block text-gray-500">Last Updated</span>
                        <span className="font-medium">
                            {formatDistanceToNow(new Date(chapter.updatedAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Media Gallery */}
            {chapter.media && chapter.media.length > 0 && (
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {chapter.media.map((item) => (
                            <div key={item.url} className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                <Image
                                    src={item.url}
                                    alt={`${chapter.title} - ${item.url}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Chapter Content */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="prose prose-indigo max-w-none">
                    {chapter.content.split('\n').map((paragraph) => {
                        const paragraphId = paragraph.trim(); // Use content as unique key
                        if (paragraph.startsWith('# ')) {
                            return <h1 key={`heading1-${paragraphId}`} className="text-3xl font-bold mb-6">{paragraph.slice(2)}</h1>;
                        }
                        if (paragraph.startsWith('## ')) {
                            return <h2 key={`heading2-${paragraphId}`} className="text-2xl font-bold mt-8 mb-4">{paragraph.slice(3)}</h2>;
                        }
                        if (paragraph.startsWith('- ')) {
                            return <li key={`list-${paragraph.trim()}`} className="ml-4">{paragraph.slice(2)}</li>;
                        }
                        if (paragraph.startsWith('1. ')) {
                            return <li key={`list-${paragraph.trim()}`} className="ml-4 list-decimal">{paragraph.slice(3)}</li>;
                        }
                        return paragraph ? <p key={`paragraph-${paragraph.trim()}`} className="mb-4">{paragraph}</p> : null;
                    })}
                </div>
            </div>

            {/* Location Info */}
            {chapter.location?.address && (
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Location</h2>
                    <div className="text-gray-600">
                        <p>{chapter.location.address}</p>
                        {chapter.location.coordinates && (
                            <div className="mt-4">
                                <a
                                    href={`https://www.google.com/maps?q=${chapter.location.coordinates[0]},${chapter.location.coordinates[1]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-500"
                                >
                                    View on Google Maps →
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Action Button */}
            {chapter.status !== 'completed' && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                    <div className="max-w-4xl mx-auto">
                        <button
                            type="button"
                            onClick={handleComplete}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-2 text-sm font-medium rounded-md text-white 
                                ${isSubmitting
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {isSubmitting ? 'Completing...' : 'Complete Chapter'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChapterDetailPage; 