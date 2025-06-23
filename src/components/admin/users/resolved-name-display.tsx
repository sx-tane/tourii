import {
	useQuestName,
	useStoryChapterName,
	useTaskName,
	useTouristSpotName,
} from "@/hooks";

interface ResolvedNameDisplayProps {
	id: string;
	type: "quest" | "tourist-spot" | "story-chapter" | "task";
	className?: string;
	action?: string; // For task type to provide context
}

export default function ResolvedNameDisplay({
	id,
	type,
	className = "",
	action,
}: ResolvedNameDisplayProps) {
	const questHook = useQuestName(type === "quest" ? id : null);
	const spotHook = useTouristSpotName(type === "tourist-spot" ? id : null);
	const chapterHook = useStoryChapterName(type === "story-chapter" ? id : null);
	const taskHook = useTaskName(type === "task" ? id : null, action);

	const getDisplayData = () => {
		switch (type) {
			case "quest":
				return {
					name: questHook.name,
					isLoading: questHook.isLoading,
					bgColor: "bg-blue-100",
					textColor: "text-blue-800",
					fallback: `Quest #${id.slice(-6)}`,
				};
			case "tourist-spot":
				return {
					name: spotHook.name,
					isLoading: spotHook.isLoading,
					bgColor: "bg-green-100",
					textColor: "text-green-800",
					fallback: `Spot #${id.slice(-6)}`,
				};
			case "story-chapter":
				return {
					name: chapterHook.name,
					isLoading: chapterHook.isLoading,
					bgColor: "bg-indigo-100",
					textColor: "text-indigo-800",
					fallback: `Chapter #${id.slice(-6)}`,
				};
			case "task":
				return {
					name: taskHook.name,
					isLoading: taskHook.isLoading,
					bgColor: "bg-purple-100",
					textColor: "text-purple-800",
					fallback: `Task #${id.slice(-6)}`,
				};
			default:
				return {
					name: `#${id.slice(-6)}`,
					isLoading: false,
					bgColor: "bg-gray-100",
					textColor: "text-gray-800",
					fallback: `#${id.slice(-6)}`,
				};
		}
	};

	const { name, isLoading, bgColor, textColor, fallback } = getDisplayData();

	if (isLoading) {
		return (
			<span
				className={`text-xs font-mono ${bgColor} ${textColor} px-2 py-1 rounded animate-pulse ${className}`}
				title={`Loading name for ID: ${id}`}
			>
				Loading...
			</span>
		);
	}

	return (
		<span
			className={`text-xs font-mono ${bgColor} ${textColor} px-2 py-1 rounded ${className}`}
			title={`Full ID: ${id}`}
		>
			{name || fallback}
		</span>
	);
}
