import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { KeywordInput } from "./keyword-input";
import { POPULAR_KEYWORDS } from "./types";

const meta: Meta<typeof KeywordInput> = {
	title: "Model Route/AI Discovery/KeywordInput",
	component: KeywordInput,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Tag-based keyword input component for AI route discovery search interface."
			}
		}
	},
	argTypes: {
		keywords: {
			description: "Array of selected keywords",
			control: "object",
		},
		onKeywordsChange: {
			description: "Callback when keywords change",
			action: "keywords-changed",
		},
		popularKeywords: {
			description: "Array of popular keywords for suggestions",
			control: "object",
		},
		placeholder: {
			description: "Input placeholder text",
			control: "text",
		},
		maxKeywords: {
			description: "Maximum number of keywords allowed",
			control: "number",
		},
		disabled: {
			description: "Whether the input is disabled",
			control: "boolean",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-full max-w-2xl p-6 bg-warmGrey-50 rounded-xl">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof KeywordInput>;

// Interactive wrapper for stories
function InteractiveKeywordInput(props: any) {
	const [keywords, setKeywords] = useState<string[]>(props.keywords || []);
	
	return (
		<KeywordInput
			{...props}
			keywords={keywords}
			onKeywordsChange={setKeywords}
		/>
	);
}

export const Default: Story = {
	render: (args) => <InteractiveKeywordInput {...args} />,
	args: {
		keywords: [],
		popularKeywords: POPULAR_KEYWORDS,
		placeholder: "Search for experiences like 'animation', 'traditional culture'...",
		maxKeywords: 10,
		disabled: false,
	},
};

export const WithSelectedKeywords: Story = {
	render: (args) => <InteractiveKeywordInput {...args} />,
	args: {
		keywords: ["animation", "traditional culture", "food & nightlife"],
		popularKeywords: POPULAR_KEYWORDS,
		placeholder: "Search for experiences like 'animation', 'traditional culture'...",
		maxKeywords: 10,
		disabled: false,
	},
};

export const MaxKeywordsReached: Story = {
	render: (args) => <InteractiveKeywordInput {...args} />,
	args: {
		keywords: [
			"animation", "traditional culture", "food & nightlife", 
			"nature", "adventure", "temples", "festivals", 
			"cherry blossoms", "hot springs", "mountain views"
		],
		popularKeywords: POPULAR_KEYWORDS,
		placeholder: "Search for experiences like 'animation', 'traditional culture'...",
		maxKeywords: 10,
		disabled: false,
	},
};

export const Disabled: Story = {
	render: (args) => <InteractiveKeywordInput {...args} />,
	args: {
		keywords: ["animation", "nature"],
		popularKeywords: POPULAR_KEYWORDS,
		placeholder: "Search for experiences like 'animation', 'traditional culture'...",
		maxKeywords: 10,
		disabled: true,
	},
};

export const CustomPlaceholder: Story = {
	render: (args) => <InteractiveKeywordInput {...args} />,
	args: {
		keywords: [],
		popularKeywords: POPULAR_KEYWORDS,
		placeholder: "What kind of adventure are you looking for?",
		maxKeywords: 5,
		disabled: false,
	},
};

export const LimitedPopularKeywords: Story = {
	render: (args) => <InteractiveKeywordInput {...args} />,
	args: {
		keywords: [],
		popularKeywords: ["animation", "temples", "food", "nature", "adventure"],
		placeholder: "Search for experiences...",
		maxKeywords: 8,
		disabled: false,
	},
};

export const NoPopularKeywords: Story = {
	render: (args) => <InteractiveKeywordInput {...args} />,
	args: {
		keywords: [],
		popularKeywords: [],
		placeholder: "Type your interests...",
		maxKeywords: 10,
		disabled: false,
	},
};

export const MobileView: Story = {
	render: (args) => <InteractiveKeywordInput {...args} />,
	args: {
		keywords: ["traditional culture", "animation"],
		popularKeywords: POPULAR_KEYWORDS,
		placeholder: "Search experiences...",
		maxKeywords: 10,
		disabled: false,
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-full max-w-sm p-4 bg-warmGrey-50 rounded-xl">
				<Story />
			</div>
		),
	],
};

export const Loading: Story = {
	render: (args) => {
		const [keywords, setKeywords] = useState<string[]>(["animation"]);
		
		return (
			<div className="space-y-4">
				<KeywordInput
					{...args}
					keywords={keywords}
					onKeywordsChange={setKeywords}
					disabled={true}
				/>
				<div className="text-sm text-charcoal-600 text-center">
					Component in loading/disabled state
				</div>
			</div>
		);
	},
	args: {
		popularKeywords: POPULAR_KEYWORDS,
		placeholder: "Searching...",
		maxKeywords: 10,
	},
};