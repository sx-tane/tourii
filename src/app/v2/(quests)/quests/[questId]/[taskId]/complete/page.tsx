'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Quest, QuestTask } from '@/app/v2/(quests)/types';
import { logger } from '@/utils/logger';
import { Spinner } from '@/app/v2/components/Spinner';

interface TaskCompletePageProps {
    params: {
        questId: string;
        taskId: string;
    };
}

const TaskCompletePage = ({ params }: TaskCompletePageProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quest, setQuest] = useState<Quest | null>(null);
    const [task, setTask] = useState<QuestTask | null>(null);
    const [formData, setFormData] = useState({
        notes: '',
        rating: 5,
        photos: [] as File[],
    });

    useEffect(() => {
        const fetchQuestAndTask = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/quests/${params.questId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch quest details');
                }

                const questData: Quest = await response.json();
                setQuest(questData);

                const foundTask = [...questData.onlineTasks, ...questData.offlineTasks]
                    .find(t => t.id === params.taskId);

                if (!foundTask) {
                    throw new Error('Task not found');
                }

                setTask(foundTask);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
                setError('Failed to load task details. Please try again later.');
                logger.error('Error fetching task details:', errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestAndTask();
    }, [params.questId, params.taskId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // TODO: Implement API call to complete task
            // const response = await fetch(`/api/quests/${params.questId}/tasks/${params.taskId}/complete`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to complete task');
            // }

            // Temporary mock delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            router.refresh();
            router.push(`/v2/quests/${params.questId}`);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError('Failed to complete task. Please try again.');
            logger.error('Error completing task:', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({
                ...prev,
                photos: [...prev.photos, ...Array.from(e.target.files || [])],
            }));
        }
    };

    const removePhoto = (index: number) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
        }));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Spinner />
            </div>
        );
    }

    if (error || !quest || !task) {
        return (
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="text-center py-12">
                    <div className="text-red-600 mb-4">{error || 'Task not found'}</div>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-indigo-600 hover:text-indigo-800"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        ← Back to Task
                    </button>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">Complete Task: {task.title}</h1>
                    <p className="mt-2 text-gray-600">
                        Share your experience and mark this task as complete.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Notes */}
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Notes
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="notes"
                                name="notes"
                                rows={4}
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Share your experience or any notes about completing this task..."
                            />
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rate your experience
                        </label>
                        <div className="mt-1">
                            <input
                                type="range"
                                id="rating"
                                name="rating"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Poor</span>
                                <span>Excellent</span>
                            </div>
                        </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700">
                            Photos
                        </label>
                        <div className="mt-1">
                            <div className="flex items-center gap-4">
                                <label htmlFor="photo-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    <span>Upload Photos</span>
                                    <input
                                        id="photo-upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                <span className="text-sm text-gray-500">
                                    {formData.photos.length} photos selected
                                </span>
                            </div>
                            {formData.photos.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                    {formData.photos.map((photo, index) => (
                                        <div key={`${photo.name}-${index}`} className="relative group">
                                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                                                <img
                                                    src={URL.createObjectURL(photo)}
                                                    alt={`Upload preview ${index + 1}`}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                className="absolute top-1 right-1 p-1 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 text-sm font-medium rounded-md text-white 
                                ${isSubmitting
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Complete Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskCompletePage;