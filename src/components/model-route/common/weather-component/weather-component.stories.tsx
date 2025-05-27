import type { Meta, StoryObj } from "@storybook/react";
import WeatherComponent, {
	type WeatherComponentProps,
} from "./weather-component";

const mockWeatherInfo: WeatherComponentProps["weatherInfo"] = {
	temperatureCelsius: 27,
	weatherName: "Sunny",
	weatherDesc: "Clear skies, perfect for outdoor activities.",
};

const meta = {
	title: "Components/WeatherComponent",
	component: WeatherComponent,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		weatherInfo: { control: "object" },
	},
} satisfies Meta<typeof WeatherComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		weatherInfo: mockWeatherInfo,
	},
};
