"use client";

import useSWR from "swr";
import { useState } from "react";
import QuestList from "@/components/quest/quest-list";

const fetcher = async (url: string) => {
	const res = await fetch(url);
	if (!res.ok) throw new Error("Failed to fetch quests");
	return res.json();
};

export default function QuestsPage() {
	const [filters, setFilters] = useState({
		questType: "all",
		unlockStatus: "all",
		premiumStatus: "all",
	});
	const [page, setPage] = useState(1);

	const query = [
		`/api/quests?`,
		filters.questType !== "all" ? `type=${filters.questType}` : null,
		filters.unlockStatus !== "all" ? `unlocked=${filters.unlockStatus}` : null,
		filters.premiumStatus !== "all" ? `premium=${filters.premiumStatus}` : null,
		`page=${page}`,
	]
		.filter(Boolean)
		.join("&");

	const { data, error, isLoading } = useSWR(query, fetcher);

	return (
		<QuestList
			quests={data}
			filters={filters}
			onFilterChange={(newFilters) => {
				setFilters(newFilters);
				setPage(1);
			}}
			onPageChange={setPage}
			isLoading={isLoading}
			error={error}
		/>
	);
}
