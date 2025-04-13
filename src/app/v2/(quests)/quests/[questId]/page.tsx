'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import type { Quest, QuestTask, TaskStatus } from '../../types';
import { ErrorFallback } from '../../../components/ui/ErrorFallback';
import { logger } from '../../../../../utils/logger';
import { LoadingSpinner } from '@/app/v2/components/ui/LoadingSpinner';

interface QuestDetailPageProps {
    params: {
        questId: string;
    };
}

interface FetchError {
    message: string;
    error?: Error;
    [key: string]: unknown;
}

const TaskStatusIcon = ({ status }: { status: TaskStatus }) => {
    const icons: Record<TaskStatus, string> = {
        completed: '✓',
        'in-progress': '⟳',
        'not-started': '○',
    };

    const colors: Record<TaskStatus, string> = {
        completed: 'bg-green-100 text-green-500',
        'in-progress': 'bg-yellow-100 text-yellow-500',
        'not-started': 'bg-gray-100 text-gray-500',
    };

    return (
        <span className={`w-8 h-8 flex items-center justify-center rounded-full ${colors[status]}`}>
            {icons[status]}
        </span>
    );
};

export default function QuestDetailPage({ params }: QuestDetailPageProps) {
    const router = useRouter();
    const { data: session, status: authStatus } = useSession();
    const [quest, setQuest] = useState<Quest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<FetchError | null>(null);

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                if (!params.questId) {
                    throw new Error('Quest ID is required');
                }

                const response = await fetch(`/api/quests/${params.questId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quest data');
                }

                const data = await response.json();
                setQuest(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
                logger.error('Error fetching quest:', errorMessage);
                setError({ message: errorMessage, error: err instanceof Error ? err : undefined });
            } finally {
                setLoading(false);
            }
        };

        fetchQuest();
    }, [params.questId]);

    const handleStartTask = async (taskId: string) => {
        try {
            const response = await fetch(`/api/quests/${params.questId}/tasks/${taskId}/start`, {
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
            router.push(`/v2/quests/${params.questId}/${taskId}`);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to start task';
            logger.error('Error starting task:', errorMessage);
            setError({ message: errorMessage, error: err instanceof Error ? err : undefined });
        }
    };

    if (authStatus === 'loading' || loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorFallback error={error} />;
    }

    if (!quest) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900">Quest not found</h2>
                <p className="mt-2 text-gray-600">The quest you're looking for doesn't exist or has been removed.</p>
                <Link
                    href="/v2/quests"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Back to Quests
                </Link>
            </div>
        );
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <Link
                        href="/v2/quests"
                        className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
                    >
                        ← Back to Quests
                    </Link>
                    {!session && (
                        <Link
                            href={`/auth/login?redirect=/v2/quests/${params.questId}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Sign in to participate
                        </Link>
                    )}
                </div>

                <h1 className="text-2xl font-bold mb-4">{quest.title}</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="mb-4">
                        <p className="text-gray-600">{quest.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Online Tasks</h2>
                            {quest.onlineTasks.map((task: QuestTask) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onStart={() => handleStartTask(task.id)}
                                    isAuthenticated={!!session}
                                />
                            ))}
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Offline Tasks</h2>
                            {quest.offlineTasks.map((task: QuestTask) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onStart={() => handleStartTask(task.id)}
                                    isAuthenticated={!!session}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold">Progress: {quest.progress}/{quest.totalTasks}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${(quest.progress / quest.totalTasks) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}

interface TaskCardProps {
    task: QuestTask;
    onStart: () => void;
    isAuthenticated: boolean;
}

function TaskCard({ task, onStart, isAuthenticated }: TaskCardProps) {
    return (
        <div className="border rounded-lg p-4 mb-2">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="mt-2 flex justify-between items-center">
                <span className={`text-sm ${task.status === 'completed' ? 'text-green-600' :
                    task.status === 'in-progress' ? 'text-yellow-600' :
                        'text-gray-600'
                    }`}>
                    {task.status}
                </span>
                {task.status === 'not-started' && isAuthenticated && (
                    <button
                        type="button"
                        onClick={onStart}
                        className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                        Start
                    </button>
                )}
            </div>
        </div>
    );
}
