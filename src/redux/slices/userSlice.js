import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload,
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    }
})



export const { login, logout } = userSlice.actions;
export default userSlice.reducer;