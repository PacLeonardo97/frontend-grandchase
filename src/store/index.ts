'use client';

import allCharReducer from './allChar';
import charReducer from './char';
import userReducer from './user';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  user: userReducer,
  allChar: allCharReducer,
  char: charReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
