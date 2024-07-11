import userSlice from './slices/user';
import themeSlice from './slices/theme';
import languageSlice from './slices/language';
import scoreSlice from './slices/score'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        currentUser : userSlice,
        theme: themeSlice,
        language : languageSlice,
        score : scoreSlice
    }
})
export default store;