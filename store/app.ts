import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can also use 'redux-persist/lib/storage/session' for sessionStorage
import fileSaveReducer from './fileSaveSlice';
import { configureStore } from '@reduxjs/toolkit';

// Define the Redux Persist configuration
const persistConfig = {
  key: 'root', // Key for the storage
  storage,     // Storage engine to use (localStorage or sessionStorage)
  // You can also configure blacklist or whitelist for which reducers to persist or not
};

const reducer = combineReducers({
    fileSave: fileSaveReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Create the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

