import { createSlice } from "@reduxjs/toolkit";

const crushCloneSlice = createSlice({
  name: "crushClone",
  initialState: {
    score: 0,
  },
  reducers: {
    resetScore(state, action){},
    increaseScore(state, action) {},
    decreaseScore(state, action) {}
  },
});

export const {resetScore, increaseScore, decreaseScore} = crushCloneSlice.actions

export default crushCloneSlice.reducer