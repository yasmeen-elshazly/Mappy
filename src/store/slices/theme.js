import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentTheme: 'light',
}

const themeSlice = createSlice({
    name: "theme",
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentTheme: (state, action) => {
            state.currentTheme = action.payload
        }
    }
})

export const { setCurrentTheme } = themeSlice.actions;
export default themeSlice.reducer;
