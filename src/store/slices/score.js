// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../APIs/Config";

// const INITIAL_STATE = {
//     currentScore: 0,
// }

// export const userScore = () => async (dispatch) => {
//     try {
//         const response = await axiosInstance.get("/Scores");
//         dispatch(setCurrentScore(response.data.currentScore)); 
//     } catch (error) {
//         // Handle the error (e.g., dispatch an error action)
//         console.error("Error fetching score:", error);
//     }
// };

// const scoreSlice = createSlice({
//     name: "score",
//     initialState: INITIAL_STATE,
//     reducers: {
//         setCurrentScore: (state, action) => {
//             state.currentTheme = action.payload
//         }
//     }
// })

// export const { setCurrentScore } = scoreSlice.actions;
// export default scoreSlice.reducer;
