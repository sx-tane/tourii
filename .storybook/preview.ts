import type { Preview } from "@storybook/react";
import { withRedux } from "./decorators";
import "../src/styles/globals.css";

// Mock font for Storybook
const mockFont = {
	style: {
		fontFamily: "Montserrat",
	},
};

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		nextjs: {
			appDirectory: true,
		},
	},
	decorators: [withRedux],
};

export default preview;
