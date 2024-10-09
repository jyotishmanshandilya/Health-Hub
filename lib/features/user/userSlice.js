import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        userid: null,
        email: null,
        token: null,
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginState: (state, action) => {
            const { userid, email, token } = action.payload;
            state.user.userid = userid;
            state.user.email = email;
            state.user.token = token;

            // console.log("Session Token: ", token);
            
        },
        logoutState: (state, action) => {
            state.user.userid = null;
            state.user.email = null;
            state.user.token = null;
        },
    },
});

export const { loginState } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.user;

export default userSlice.reducer;