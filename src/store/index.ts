'use client';

import charReducer from './char';
import userReducer from './user';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  allChar: charReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
