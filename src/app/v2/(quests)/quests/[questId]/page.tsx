"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuestOverview from "@/components/quest/quest-overview";
import { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";

const fetchQuestById = async (questId: string) => {
	const res = await fetch(`/api/quests/${questId}`);
	if (!res.ok) throw new Error("Failed to fetch quest");
	return res.json();
};

export default function QuestDetailPage() {
	const { questId } = useParams() as { questId: string };
	const [quest, setQuest] = useState<QuestResponseDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!questId) return;
		setLoading(true);
		fetchQuestById(questId)
			.then((data) => setQuest(data.quest))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [questId]);

	if (loading) return <div className="p-8 text-center">Loading quest...</div>;
	if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
	if (!quest) return <div className="p-8 text-center">Quest not found.</div>;

	return <QuestOverview quest={quest} />;
}
