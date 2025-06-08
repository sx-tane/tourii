import useSWR from "swr";
import { QuestResponseDto } from "@/api/generated";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function getQuestById(questId: string) {
	const { data, error, mutate } = useSWR<QuestResponseDto>(
		questId ? `/api/quests/${questId}` : null,
		fetcher,
	);

	return {
		quest: data,
		isLoadingQuest: !error && !data,
		isError: error,
		mutateQuest: mutate,
	};
}
