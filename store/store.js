import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

export const makeStore = () => {
    return configureStore({
        reducer: { user: userReducer },
    });
};
