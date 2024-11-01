import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        userid: null,
        email: null,
        token: null,
        firstname: null,
        lastname: null,
        address: {
            unit: null,
            street: null,
            city: null,
            state: null,
            country: null,
            zip: null
        }
    },
    reviews: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginState: (state, action) => {
            const { userid, email, token } = action.payload;
            if(userid && email && token){
                state.user.userid = userid;
                state.user.email = email;
                state.user.token = token;
            }            
        },
        logoutState: (state) => {
            state.user.userid = null;
            state.user.email = null;
            state.user.token = null;
        },
    },
});

export const { loginState, logoutState } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.user;

export default userSlice.reducer;