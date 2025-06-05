import type { Decorator } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/lib/redux/store";

export const withRedux: Decorator = (Story) => (
	<Provider store={store}>
		<Story />
	</Provider>
);
