import { afterEach, beforeAll, vi } from "vitest";
// 👇 If you're using Next.js, import from @storybook/nextjs
//   If you're using Next.js with Vite, import from @storybook/experimental-nextjs-vite
import { setProjectAnnotations } from "@storybook/react";
import * as previewAnnotations from "./preview";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import React from "react";

// Make React available globally
globalThis.React = React;

// Define process for Next.js
Object.defineProperty(globalThis, "process", {
	value: { env: { NODE_ENV: "test", NEXT_PUBLIC_BASE_PATH: "" } },
});

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
	usePathname: () => "/",
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
	}),
}));

// Mock Next.js font imports
vi.mock("next/font/google", () => ({
	Montserrat: () => ({
		style: {
			fontFamily: "Montserrat",
		},
		subsets: ["latin"],
		display: "swap",
	}),
	Noto_Serif_JP: () => ({
		style: {
			fontFamily: "Noto Serif JP",
		},
		subsets: ["latin"],
		display: "swap",
	}),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
	__esModule: true,
	default: function Image({
		src,
		alt,
		width,
		height,
		...props
	}: {
		src: string;
		alt: string;
		width: number;
		height: number;
		[key: string]: unknown;
	}) {
		return React.createElement("img", { src, alt, width, height, ...props });
	},
}));

// Setup test environment
beforeAll(() => {
	setProjectAnnotations([previewAnnotations]);
});

// Cleanup after each test
afterEach(() => {
	cleanup();
});
