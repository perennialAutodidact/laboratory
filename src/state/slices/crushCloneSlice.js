import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0
}

const crushCloneSlice = createSlice({
  name: "crushClone",
  initialState: initialState,
  reducers: {
    resetScore(state, action){
      return {
        score: 0
      }
    },
    increaseScore(state, action) {
      return {
        score: state.store + 1
      }
    },
    decreaseScore(state, action) {}
  },
});

export const {resetScore, increaseScore, decreaseScore} = crushCloneSlice.actions

export default crushCloneSlice.reducer