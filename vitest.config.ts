import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		storybookTest({
			configDir: path.join(dirname, ".storybook"),
			storybookScript: "yarn storybook --ci",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(dirname, "./src"),
			"~": dirname,
		},
	},
	test: {
		browser: {
			enabled: true,
			name: "chromium",
			provider: "playwright",
			headless: true,
		},
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
		include: ["**/*.stories.{js,jsx,ts,tsx}"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
});
