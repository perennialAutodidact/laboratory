import {
  createSlice,
  createAsyncThunk,
  rejectWithValue
} from '@reduxjs/toolkit'
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { OPEN_CAGE_DATA_API_KEY } from '../../secrets'

dayjs.extend(utc)

const to24hr = (time) => {
  let offset = new Date().getTimezoneOffset()
  let hourOffset = -(offset / 60)
  time = time.split(' ');
  let ampm = time[1];
  let [hour, minute, second] = time[0].split(':').map(item => parseInt(item));

  time = dayjs() //.utc() //.startOf('day')

  console.log(time.format('H:mm:ss'))

  hour = ampm === 'AM' ? hour : hour + 12;

  return {hour, minute, second}
};

export const fetchCoords = createAsyncThunk(
  'sunClock/fetchCoords',
  // date: string - MM-DD-YYYY
  async (query, { rejectWithValue }) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json'
    const results = await axios
      .get(url, {
        params: {
          query: query,
          key: OPEN_CAGE_DATA_API_KEY
        }
      })
      .then(res => res.data.results)
      .catch(err => rejectWithValue(err))
    return results
  }
)

export const fetchSunData = createAsyncThunk(
  'sunClock/fetchSunData',
  // date: string - MM-DD-YYYY
  async (coords, { rejectWithValue }) => {
    const { lat, lng } = coords
    const url = 'https://api.sunrise-sunset.org/json'
    try {
      const response = await axios.get(url, {
        params: {
          lat: lat,
          lng: lng
        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchLocalTime = createAsyncThunk(
  'sunClock/fetchLocalTime',
  // date: string - MM-DD-YYYY
  async (coords, { rejectWithValue }) => {
    const { lat, lng } = coords
    const url = 'https://www.timeapi.io/api/Time/current/coordinate'
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          latitude: lat,
          longitude: lng
        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const initialState = {
  lat: null,
  lng: null,
  sunrise: null,
  sunset: null,
  city: '',
  state: '',
  country: '',
  showForm: true,
  loadingStatus: 'IDLE'
}

const sunClockSlice = createSlice({
  name: 'sunClock',
  initialState: initialState,
  reducers: {
    toggleForm (state, action) {
      return {
        showForm: !state.showForm
      }
    }
  },
  extraReducers: {
    // GET SUN DATA
    [fetchSunData.pending]: (state, action) => {
      state.loadingStatus = 'PENDING'
    },
    [fetchSunData.rejected]: (state, action) => {
      state.coordsSearchResults = []
      state.loadingStatus = 'IDLE'
    },
    [fetchSunData.fulfilled]: (state, action) => {
        state.loadingStatus = 'IDLE'
        let sunrise = action.payload.results.sunrise
        let sunset = action.payload.results.sunset

        console.log(to24hr(sunrise));
    }
  }
})

export const {
  setClockData,
  setSunTimes,
  setCoords,
  setLocation,
  toggleForm
} = sunClockSlice.actions

export default sunClockSlice.reducer
