"use client";

import type { QuestListResponseDto } from "@/api/generated/models/QuestListResponseDto";
import QuestList from "@/components/quest/quest-list";
import { useProxySWR } from "@/lib/swr/useProxySWR";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QuestsPage() {
	const [filters, setFilters] = useState({
		questType: "all",
		unlockStatus: "all",
		premiumStatus: "all",
	});
	const [page, setPage] = useState(1);
	const router = useRouter();

	const query = [
		"/api/quests?",
		filters.questType !== "all" ? `type=${filters.questType}` : null,
		filters.unlockStatus !== "all" ? `unlocked=${filters.unlockStatus}` : null,
		filters.premiumStatus !== "all" ? `premium=${filters.premiumStatus}` : null,
		`page=${page}`,
	]
		.filter(Boolean)
		.join("&");

	const { data, error, isLoading } = useProxySWR<QuestListResponseDto>(query);

	const handleQuestClick = (questId: string) => {
		router.push(`/v2/quests/${questId}`);
	};

	return (
		<QuestList
			quests={data}
			filters={filters}
			onFilterChange={(newFilters: typeof filters) => {
				setFilters(newFilters);
				setPage(1);
			}}
			onPageChange={setPage}
			isLoading={isLoading}
			error={error}
			onQuestClick={handleQuestClick}
		/>
	);
}
