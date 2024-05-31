import { combineReducers } from '@reduxjs/toolkit';
import userReducer, { UserState } from '../slices/userSlice';

export interface RootState {
    user: UserState;
}

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
