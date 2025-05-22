/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import allCharReducer from './allChar';
import charReducer from './char';
import userReducer from './user';
import createIdbStorage from '@piotr-cz/redux-persist-idb-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  user: userReducer,
  allChar: allCharReducer,
  char: charReducer,
});

const createNoopStorage = () => {
  return {
    getItem(_key: any): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any): Promise<any> {
      return Promise.resolve(value);
    },
    removeItem(_key: any): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? import('@piotr-cz/redux-persist-idb-storage').then((e) => {
        return e.default({ name: 'myApp', storeName: 'keyval' });
      })
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: await storage,
  serialize: false, // Data serialization is not required and disabling it allows you to inspect storage value in DevTools; Available since redux-persist@5.4.0
  deserialize: false, // Required to bear same value as `serialize` since redux-persist@6.0
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
