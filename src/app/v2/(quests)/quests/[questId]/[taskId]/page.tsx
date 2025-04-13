'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Quest, QuestTask } from '../../../types';
import { formatDistanceToNow } from 'date-fns';
import { logger } from '@/utils/logger';

interface TaskDetailPageProps {
    params: {
        questId: string;
        taskId: string;
    };
}

const TaskDetailPage = ({ params }: TaskDetailPageProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quest, setQuest] = useState<Quest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                const response = await fetch(`/api/quests/${params.questId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quest data');
                }
                const data = await response.json();
                setQuest(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
                logger.error('Error fetching quest:', errorMessage);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchQuest();
    }, [params.questId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600" />
            </div>
        );
    }

    if (error || !quest) {
        return (
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h1 className="text-xl font-bold text-gray-900">Error</h1>
                <p className="mt-2 text-gray-600">{error || 'Quest not found'}</p>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                    ← Go back
                </button>
            </div>
        );
    }

    const task = [...quest.onlineTasks, ...quest.offlineTasks].find(t => t.id === params.taskId);

    if (!task) {
        return (
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h1 className="text-xl font-bold text-gray-900">Task not found</h1>
                <p className="mt-2 text-gray-600">The task you're looking for doesn't exist.</p>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                    ← Go back
                </button>
            </div>
        );
    }

    const handleStartTask = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/quests/${params.questId}/tasks/${params.taskId}/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to start task');
            }

            const updatedQuest = await response.json();
            setQuest(updatedQuest);
            router.refresh();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to start task';
            logger.error('Error starting task:', errorMessage);
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCompleteTask = () => {
        router.push(`/v2/quests/${params.questId}/tasks/${params.taskId}/complete`);
    };

    return (
        <div className="space-y-6">
            {/* Task Header */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            ← Back to Quest
                        </button>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                    <p className="mt-2 text-gray-600">{task.description}</p>
                </div>

                {/* Task Details */}
                <div className="border-t border-gray-200 pt-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Quest</dt>
                            <dd className="mt-1 text-sm text-gray-900">{quest.title}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Location</dt>
                            <dd className="mt-1 text-sm text-gray-900">{quest.location}</dd>
                        </div>
                        {task.startedAt && (
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Started</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {formatDistanceToNow(new Date(task.startedAt), { addSuffix: true })}
                                </dd>
                            </div>
                        )}
                        {task.completedAt && (
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Completed</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {formatDistanceToNow(new Date(task.completedAt), { addSuffix: true })}
                                </dd>
                            </div>
                        )}
                    </dl>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                    {task.status === 'not-started' && (
                        <button
                            type="button"
                            onClick={handleStartTask}
                            disabled={isSubmitting}
                            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md text-white 
                                ${isSubmitting
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {isSubmitting ? 'Starting...' : 'Start Task'}
                        </button>
                    )}
                    {task.status === 'in-progress' && (
                        <button
                            type="button"
                            onClick={handleCompleteTask}
                            className="flex-1 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                            Complete Task
                        </button>
                    )}
                </div>
            </div>

            {/* Task Requirements or Additional Info */}
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-2">
                    {quest.requirements?.prerequisites?.map((req) => (
                        <li key={req} className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">•</span>
                            {req}
                        </li>
                    ))}
                    {quest.requirements?.level && (
                        <li className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">•</span>
                            Level {quest.requirements.level} required
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TaskDetailPage;
