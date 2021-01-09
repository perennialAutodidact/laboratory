import {SET_SUNRISE_SUNSET_TIMES} from '../constants/actionTypes';
import {initialState} from '../state';

const rootReducer = (state=initialState, action) => {
  switch(action.type){
    default:
      return state
    
    case SET_SUNRISE_SUNSET_TIMES:
      let {sunrise, sunset} = action.payload
      console.log('reducer:', sunrise, sunset);
      return {
        ...state,
        sunrise: sunrise,
        sunset: sunset
      } 
  }
}

export default rootReducer;