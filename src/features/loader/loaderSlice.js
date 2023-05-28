const { createSlice } = require("@reduxjs/toolkit");

const loadingSlice = createSlice({
    name: 'loader',
    initialState: { isLoading: false },
    reducers: {
        setLoaderLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const loaderIsLoading = (state) => state.loader.isLoading

const { actions, reducer } = loadingSlice;

export const { setLoaderLoading } = actions
export default reducer