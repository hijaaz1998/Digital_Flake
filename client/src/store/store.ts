import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../slices/userSlice';

type RootState = ReturnType<typeof rootReducer>;

const persistUserConfig: PersistConfig<RootState> = {
    key: 'user',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
});

const persistedUserReducer = persistReducer(persistUserConfig, rootReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer
    } ,
});

export const persistedStore = persistStore(store);

