import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    current_language: 'english',
    available_themes: ['english', 'arabic', 'french']
}

const languageSlice = createSlice({
    name: "language",
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentLanguage: (state, action) => {
            state.current_language = action.payload
        }
    }
})

export const { setCurrentLanguage } = languageSlice.actions;
export default languageSlice.reducer;
