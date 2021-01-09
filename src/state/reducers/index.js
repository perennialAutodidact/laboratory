import {SET_SUNRISE_SUNSET_TIMES} from '../constants/actionTypes';
import {initialState} from '../'

const rootReducer = (state=initialState, action) => {
  switch(action.type){
    default:
      return state
    
    case SET_SUNRISE_SUNSET_TIMES:
      return {
        ...state,
        sunrise: action.payload.sunrise,
        sunset: action.payload.sunset
      }
  }
}

export default rootReducer;