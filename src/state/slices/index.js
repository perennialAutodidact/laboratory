import {combineReducers} from '@reduxjs/toolkit';
import crushClone from './crushCloneSlice';
import sunClock from './sunClockSlice';

const rootReducer = combineReducers({
  crushClone,
  sunClock
})

export default rootReducer;
