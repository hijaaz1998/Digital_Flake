import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer, { RootState } from './rootReducer'; // Adjust the import based on your file structure

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: ['user'], // Only persist the user slice
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistedStore = persistStore(store);
