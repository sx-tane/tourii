import { NextResponse } from "next/server";
import type { Quest, QuestTask } from "@/app/v2/(quests)/types";

// Mock data - in production this would be a database call
const mockQuests: Record<string, Quest> = {
	"temple-visit": {
		id: "temple-visit",
		title: "Temple Visit Challenge",
		type: "EARN_TO_TRAVEL",
		location: "Kyoto",
		description:
			"Visit 3 temples in Northern Kyoto and learn about their unique architectural styles.",
		reward: {
			type: "UNKNOWN",
			value: "200",
			icon: "🏆",
			magatamaPoints: 0,
		},
		difficulty: "Medium",
		deadline: "2024-03-25",
		progress: 1,
		totalTasks: 3,
		onlineTasks: [],
		offlineTasks: [
			{
				id: "visit-kinkakuji",
				title: "Visit Kinkaku-ji",
				description: "Visit the Golden Pavilion",
				status: "completed",
				type: "VISIT_LOCATION",
				isUnlocked: false,
				magatamaPointAwarded: 0,
				totalMagatamaPointAwarded: 0,
			},
			{
				id: "visit-ryoanji",
				title: "Visit Ryoan-ji",
				description: "Experience the Zen rock garden",
				status: "not-started",
				type: "VISIT_LOCATION",
				isUnlocked: false,
				magatamaPointAwarded: 0,
				totalMagatamaPointAwarded: 0,
			},
			{
				id: "visit-ninnaji",
				title: "Visit Ninna-ji",
				description: "Explore the imperial temple",
				status: "not-started",
				type: "VISIT_LOCATION",
				isUnlocked: false,
				magatamaPointAwarded: 0,
				totalMagatamaPointAwarded: 0,
			},
		],
		tags: ["temples", "architecture", "kyoto"],
		createdAt: "2024-03-01T00:00:00Z",
		updatedAt: "2024-03-18T11:00:00Z",
		isUnlocked: false,
		isPremium: false,
	},
	"photo-challenge": {
		id: "photo-challenge",
		title: "Sakura Photo Hunt",
		type: "TRAVEL_TO_EARN",
		location: "Tokyo",
		description:
			"Capture and share cherry blossom photos from famous spots around Tokyo.",
		reward: {
			type: "CULTURAL_COMMUNITY",
			value: "Sakura Photographer",
			icon: "📸",
			magatamaPoints: 0,
		},
		difficulty: "Easy",
		deadline: "2024-04-10",
		progress: 2,
		totalTasks: 3,
		onlineTasks: [
			{
				id: "photo-upload",
				title: "Upload Photos",
				description: "Share your best cherry blossom shots",
				status: "completed",
				type: "VISIT_LOCATION",
				isUnlocked: false,
				magatamaPointAwarded: 0,
				totalMagatamaPointAwarded: 0,
			},
			{
				id: "apply-filter",
				title: "Apply Filters",
				description: "Enhance your photos with special filters",
				status: "completed",
				type: "VISIT_LOCATION",
				isUnlocked: false,
				magatamaPointAwarded: 0,
				totalMagatamaPointAwarded: 0,
			},
			{
				id: "share-story",
				title: "Share Story",
				description: "Write about your photo journey",
				status: "not-started",
				type: "VISIT_LOCATION",
				isUnlocked: false,
				magatamaPointAwarded: 0,
				totalMagatamaPointAwarded: 0,
			},
		],
		offlineTasks: [],
		tags: ["photography", "sakura", "spring"],
		createdAt: "2024-03-10T00:00:00Z",
		updatedAt: "2024-03-18T11:00:00Z",
		isUnlocked: false,
		isPremium: false,
	},
};

export async function POST(
	request: Request,
	context: { params: Promise<{ questId: string; taskId: string }> },
) {
	// Await the dynamic route parameters
	const params = await context.params;
	const { questId, taskId } = params;

	// Get the completion data from the request body
	const completionData = await request.json();

	const quest = mockQuests[questId];

	if (!quest) {
		return new NextResponse("Quest not found", { status: 404 });
	}

	// Find the task in either onlineTasks or offlineTasks
	const allTasks = [...quest.onlineTasks, ...quest.offlineTasks];
	const taskIndex = allTasks.findIndex((t) => t.id === taskId);

	if (taskIndex === -1) {
		return new NextResponse("Task not found", { status: 404 });
	}

	// Update the task status to completed
	const task = allTasks[taskIndex] as QuestTask;
	task.status = "completed";
	task.completedAt = new Date().toISOString();

	// Store the completion data (in production this would go to a database)
	task.notes = completionData.notes;
	task.rating = completionData.rating;
	// Photo handling would be implemented here in production

	// Update the quest progress
	const completedTasks = allTasks.filter(
		(t) => t.status === "completed",
	).length;
	quest.progress = completedTasks;

	// Return the updated quest
	return NextResponse.json(quest);
}
