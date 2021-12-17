import {
  createSlice,
  createAsyncThunk,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { OPEN_CAGE_DATA_API_KEY } from "../../secrets";

export const fetchCoords = createAsyncThunk(
  "sunClock/fetchCoords",
  // date: string - MM-DD-YYYY
  async (query, { rejectWithValue }) => {
    const url = "https://api.opencagedata.com/geocode/v1/json";
    const results = await axios
      .get(url, {
        params: {
          query: query,
          key: OPEN_CAGE_DATA_API_KEY,
        },
      })
      .then((res) => res.data.results)
      .catch((err) => rejectWithValue(err));
    return results;
  }
);

export const fetchSunData = createAsyncThunk(
  "sunClock/fetchSunData",
  // date: string - MM-DD-YYYY
  async (coords, { rejectWithValue }) => {
    const { lat, lng } = coords;
    const url = "https://api.sunrise-sunset.org/json";
    try {
      const response = await axios.get(url, {
        params: {
          lat: lat,
          lng: lng,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  lat: null,
  lng: null,
  sunriseTime: null,
  sunsetTime: null,
  city: "",
  state: "",
  country: "",
  showForm: true,
  coordsSearchResults: [],
};

const sunClockSlice = createSlice({
  name: "sunClock",
  initialState: initialState,
  reducers: {
    setSunData(state, action) {
      return {
        sunriseTime: action.payload.sunrise,
        sunsetTime: action.payload.sunset,
      };
    },
    setCoords(state, action) {
      return {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    },
    setLocation(state, action) {
      return {
        city: action.payload.city,
        state: action.payload.state,
        country: action.payload.country,
      };
    },
    toggleForm(state, action) {
      return {
        showForm: !state.showForm,
      };
    },
  },
  extraReducers: {
    // GET CONTACTS
    [fetchCoords.pending]: (state, action) => {
      state.coordsLoadingStatus = "PENDING";
    },
    [fetchCoords.rejected]: (state, action) => {
      state.coordsSearchResults = [];
      state.coordsLoadingStatus = "IDLE";
    },
    [fetchCoords.fulfilled]: (state, action) => {
      console.log("payload", action);
      state.coordsSearchResults = action.payload;
      state.coordsLoadingStatus = "IDLE";
    },
  },
});

export const { setSunTimes, setCoords, setLocation, toggleForm } =
  sunClockSlice.actions;

export default sunClockSlice.reducer;
