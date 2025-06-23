import type { Meta, StoryObj } from "@storybook/react";
import { WelcomeBanner } from "./welcome-banner";
import { UserResponseDto } from "@/api/generated";

const meta: Meta<typeof WelcomeBanner> = {
	title: "Dashboard/WelcomeBanner",
	component: WelcomeBanner,
	parameters: {
		layout: "padded",
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#f5f5f5" },
				{ name: "dark", value: "#333333" },
			],
		},
	},
	tags: ["autodocs"],
	argTypes: {
		username: {
			control: "text",
			description: "User display name",
		},
		userLevel: {
			control: "select",
			options: Object.values(UserResponseDto.level),
			description: "User level from API",
		},
		userStatus: {
			control: "select",
			options: Object.values(UserResponseDto.userDigitalPassportType),
			description: "User digital passport type",
		},
	},
};

export default meta;
type Story = StoryObj<typeof WelcomeBanner>;

export const Default: Story = {
	args: {
		username: "Hiroshi",
		userLevel: UserResponseDto.level.E_CLASS_AMATSUKAMI,
		userStatus: UserResponseDto.userDigitalPassportType.AMATSUKAMI,
	},
};

export const DefaultExplorer: Story = {
	args: {
		// No username provided - should show "Explorer"
		userLevel: UserResponseDto.level.BONJIN,
		userStatus: UserResponseDto.userDigitalPassportType.BONJIN,
	},
};

export const HighLevelUser: Story = {
	args: {
		username: "Sakura",
		userLevel: UserResponseDto.level.S_CLASS_AMATSUKAMI,
		userStatus: UserResponseDto.userDigitalPassportType.AMATSUKAMI,
	},
};

export const KunitsukamiUser: Story = {
	args: {
		username: "Takeshi",
		userLevel: UserResponseDto.level.B_CLASS_KUNITSUKAMI,
		userStatus: UserResponseDto.userDigitalPassportType.KUNITSUKAMI,
	},
};

export const YokaiUser: Story = {
	args: {
		username: "Yuki",
		userLevel: UserResponseDto.level.A_CLASS_YOKAI,
		userStatus: UserResponseDto.userDigitalPassportType.YOKAI,
	},
};

export const LongUsername: Story = {
	args: {
		username: "Yamashita Takuya",
		userLevel: UserResponseDto.level.D_CLASS_AMATSUKAMI,
		userStatus: UserResponseDto.userDigitalPassportType.AMATSUKAMI,
	},
};

export const NoData: Story = {
	args: {
		// No props provided - should show defaults
	},
};

export const MidTierUser: Story = {
	args: {
		username: "Kenji",
		userLevel: UserResponseDto.level.C_CLASS_KUNITSUKAMI,
		userStatus: UserResponseDto.userDigitalPassportType.KUNITSUKAMI,
	},
};
