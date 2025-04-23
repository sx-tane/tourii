import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/lib/redux/store';
import type { Decorator } from '@storybook/react';

export const withRedux: Decorator = (Story) => (
    <Provider store={store}>
        <Story />
    </Provider>
); 