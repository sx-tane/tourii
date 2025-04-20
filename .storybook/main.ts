import type { StorybookConfig } from "@storybook/nextjs";
import path from "node:path";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	webpackFinal: async (config) => {
		// Add support for absolute imports
		if (config?.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				"@": path.resolve(__dirname, "../src"),
				"~": path.resolve(__dirname, ".."),
			};

			// Ensure proper module resolution
			config.resolve.modules = [
				...(config.resolve.modules || []),
				path.resolve(__dirname, "../src"),
				"node_modules",
			];

			// Handle Windows paths
			config.resolve.symlinks = true;
		}

		// Ensure proper handling of @reduxjs/toolkit
		if (config?.module?.rules) {
			config.module.rules.push({
				test: /[\\/]node_modules[\\/]@reduxjs[\\/]toolkit[\\/]/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"],
					},
				},
			});
		}

		return config;
	},
	staticDirs: ["../public"],
	core: {
		builder: "@storybook/builder-webpack5",
	},
};

export default config;
