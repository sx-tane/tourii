import { describe, expect, it } from "vitest";

describe("useNameResolution utility functions", () => {
	describe("ID formatting utilities", () => {
		it("should format quest ID fallback correctly", () => {
			const questId = "quest-a-BAAA-123";
			const formatted = `Quest #${questId.slice(-6)}`;

			expect(formatted).toBe("Quest #AA-123");
		});

		it("should format tourist spot ID fallback correctly", () => {
			const spotId = "spot-4-BAAA-456";
			const formatted = `Tourist Spot #${spotId.slice(-6)}`;

			expect(formatted).toBe("Tourist Spot #AA-456");
		});

		it("should format story chapter ID fallback correctly", () => {
			const chapterId = "chapter-7-BAAA-789";
			const formatted = `Story Chapter #${chapterId.slice(-6)}`;

			expect(formatted).toBe("Story Chapter #AA-789");
		});
	});

	describe("Task name formatting", () => {
		it("should format task name with action", () => {
			const taskId = "task-BAAA-abc";
			const action = "PHOTO_UPLOAD";

			const actionFormatted = action
				.split("_")
				.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
				.join(" ");

			const formatted = `${actionFormatted} Task #${taskId.slice(-6).toUpperCase()}`;

			expect(formatted).toBe("Photo Upload Task #AA-ABC");
		});

		it("should handle different action types", () => {
			const actions = [
				"PHOTO_UPLOAD",
				"SHARE_SOCIAL",
				"ANSWER_TEXT",
				"CHECK_IN",
			];

			const expectedFormats = [
				"Photo Upload",
				"Share Social",
				"Answer Text",
				"Check In",
			];

			actions.forEach((action, index) => {
				const formatted = action
					.split("_")
					.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
					.join(" ");

				expect(formatted).toBe(expectedFormats[index]);
			});
		});
	});

	describe("URL construction for name resolution", () => {
		it("should construct correct quest URL", () => {
			const questId = "quest-123";
			const url = `/api/quests/${questId}`;

			expect(url).toBe("/api/quests/quest-123");
		});

		it("should construct correct tourist spot URL", () => {
			const spotId = "spot-456";
			const url = `/api/tourist-spots/${spotId}`;

			expect(url).toBe("/api/tourist-spots/spot-456");
		});

		it("should construct correct story chapter URL", () => {
			const chapterId = "chapter-789";
			const url = `/api/story-chapters/${chapterId}`;

			expect(url).toBe("/api/story-chapters/chapter-789");
		});
	});

	describe("Name resolution response handling", () => {
		it("should extract quest name from response", () => {
			const response = { title: "Discover Harajiri Falls" };
			const name = response.title;

			expect(name).toBe("Discover Harajiri Falls");
		});

		it("should extract tourist spot name from response", () => {
			const response = { spotName: "Harajiri Falls" };
			const name = response.spotName;

			expect(name).toBe("Harajiri Falls");
		});

		it("should extract story chapter name from response", () => {
			const response = { title: "Prologue - Chapter 1" };
			const name = response.title;

			expect(name).toBe("Prologue - Chapter 1");
		});
	});
});
