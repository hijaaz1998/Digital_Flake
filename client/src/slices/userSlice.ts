import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

export interface UserState {
    user: string;
}

const initialState: UserState = {
    user: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = '';
            storage.removeItem('persist:user');
            localStorage.removeItem('userId'); // Clear user ID from local storage
        }
    }
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export default userSlice.reducer;
