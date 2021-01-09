import { SET_SUNRISE_SUNSET_TIMES } from '../constants/actionTypes'

export const setSunriseSunsetTimes = (payload) => {
  console.log('action:',payload);
  return {type: SET_SUNRISE_SUNSET_TIMES, payload}
}

