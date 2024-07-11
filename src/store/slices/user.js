import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../APIs/Config';

const INITIAL_STATE = {
    currentUser: null,
    profileImage: '',
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (loginForm) => {
        const response = await axiosInstance.post("/Account/Login", loginForm);
        console.log(response.data);
        return response.data; // Ensure response data includes email
    }
);

const storeInLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Error storing data in local storage:", error);
    }
};

const userSlice = createSlice({
    name: 'currentUser',
    initialState: INITIAL_STATE,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.profileImage = '';
            state.loading = false;
            state.error = null;
            localStorage.removeItem('currentUser');
        },
        increaseUserScore: (state, action) => {
            state.currentUser.score += action.payload;
        },
        updateProfileImage: (state, action) => {
            state.profileImage = action.payload;
            if (state.currentUser) {
                state.currentUser.profileImage = action.payload;
            }
            storeInLocalStorage('currentUser', state.currentUser);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.currentUser = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.profileImage = action.payload.profileImage;
                state.loading = false;
                state.error = null;
                storeInLocalStorage('currentUser', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.currentUser = null;
                state.loading = false;
                console.log(action.error);
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Access Denied! Wrong email or password';
                } else {
                    state.error = action.error.message;
                }
            });
    }
});

export default userSlice.reducer;
export const { logout, increaseUserScore, updateProfileImage } = userSlice.actions;
