const { createSlice } = require("@reduxjs/toolkit");

const user = localStorage.getItem('user') || null;
const token = localStorage.getItem('token') || null;

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: user && JSON.parse(user), token: token },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            localStorage.setItem('token', token)
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

export const { setCredentials, logOut } = actions
export default reducer