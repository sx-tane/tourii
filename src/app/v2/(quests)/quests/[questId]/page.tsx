"use client";

import { useParams } from "next/navigation";
import QuestOverview from "@/components/quest/quest-overview";
import { useProxySWR } from "@/lib/swr/useProxySWR";
import type { QuestResponseDto } from "@/api/generated/models/QuestResponseDto";

export default function QuestDetailPage() {
        const { questId } = useParams() as { questId: string };
        const swrKey = questId ? `/api/quests/${questId}` : null;
        const { data, error, isLoading } =
                useProxySWR<QuestResponseDto>(swrKey);

        if (isLoading) return <div className="p-8 text-center">Loading quest...</div>;
        if (error) return <div className="p-8 text-center text-red-600">{error.message}</div>;
        if (!data) return <div className="p-8 text-center">Quest not found.</div>;

        return <QuestOverview quest={data.quest} />;
}
