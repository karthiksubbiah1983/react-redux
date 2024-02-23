import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CountryList {
  id: number;
  country: string[];
}

type InitialState = {
  loading: boolean;
  availableCountry: CountryList[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  availableCountry: [],
  error: "",
};

export const fetchAvailableCountries = createAsyncThunk(
  "user/fetchAvailableCountries",
  async () => {
    const response = await fetch("http://localhost:3001/countries");
    const data = await response.json();
    return data;
  }
);

const availableCountrySlice = createSlice({
  name: "availableCountries",
  initialState,
  reducers: {
    updateAvailableLocation: (state, action: PayloadAction<CountryList[]>) => {
      state.availableCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableCountries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAvailableCountries.fulfilled,
      (state, action: PayloadAction<CountryList[]>) => {
        state.loading = false;
        state.availableCountry = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchAvailableCountries.rejected, (state, action) => {
      state.loading = false;
      state.availableCountry = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const { updateAvailableLocation } = availableCountrySlice.actions;

export default availableCountrySlice.reducer;
