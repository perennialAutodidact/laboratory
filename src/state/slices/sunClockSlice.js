import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lng: null,
  sunriseTime: null,
  sunsetTime: null,
  city: '',
  state: '',
  country: ''
}

const sunClockSlice = createSlice({
  name: "sunClock",
  initialState: initialState,
  reducers: {
    setSunTimes(state, action){
      return {
        sunriseTime: action.payload.sunrise,
        sunsetTime: action.payload.sunset,
      }
    },
    setCoords(state, action){
      return {
        lat: action.payload.lat,
        lng: action.payload.lng
      }
    },
    setLocation(state, action){
      return {
        city: action.payload.city,
        state: action.payload.state,
        country: action.payload.country
      }
    }
    
  },
});

export const {setSunTimes, setCoords, setLocation} = sunClockSlice.actions

export default sunClockSlice.reducer