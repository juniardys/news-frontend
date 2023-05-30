import { authAPI } from "@/features/auth/authAPI";

const { createSlice } = require("@reduxjs/toolkit");

let user = JSON.parse(localStorage.getItem('user') || null);
let token = localStorage.getItem('token') || null;

// check user token
if (token) {
    try {
        const response = await authAPI.check()
        if (response?.success) {
            user = response?.data
        }
    } catch (error) {
        user = null;
        token = null;
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { user, token },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
        },
        updateUser: (state, action) => {
            const { user } = action.payload
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})

export const selectCurentUser = (state) => state.auth.user
export const selectCurentToken = (state) => state.auth.token

const { actions, reducer } = authSlice;

export const { setCredentials, updateUser, logOut } = actions
export default reducer