import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	// Storybook integration removed to simplify test environment
	resolve: {
		alias: {
			"@": path.resolve(dirname, "./src"),
			"~": dirname,
		},
	},
	test: {
		// Disable browser testing to avoid requiring Playwright
		setupFiles: [path.join(dirname, ".storybook/vitest.setup.ts")],
		environment: "jsdom",
		globals: true,
		mockReset: true,
		env: {
			NEXT_PUBLIC_BASE_PATH: "",
			NODE_ENV: "test",
		},
		deps: {
			inline: [/@storybook\/.*/, /vitest/],
		},
		// Only run tests from `*.test.*` or `*.spec.*` files
		include: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
		passWithNoTests: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
});
