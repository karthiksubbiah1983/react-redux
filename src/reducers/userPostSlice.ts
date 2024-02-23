import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  fname: string;
  lname?: string;
  country?: string;
  travelDate?: string;
  optedCountry: string[];
}

type InitialState = {
  loading: boolean;
  userProfile: UserProfile;
  userPost: UserProfile[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  userProfile: {
    fname: "",
    lname: "",
    country: "",
    travelDate: "",
    optedCountry: [],
  },
  userPost: [],
  error: "",
};

export const fetchUserPost = createAsyncThunk(
  "user/fetchUserPost",
  async () => {
    const response = await fetch("http://localhost:3002/posts");
    const data = await response.json();
    return data;
  }
);

const userPostSlice = createSlice({
  name: "userPost",
  initialState,
  reducers: {
    updatePreference: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserPost.fulfilled,
      (state, action: PayloadAction<UserProfile[]>) => {
        state.loading = false;
        state.userPost = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUserPost.rejected, (state, action) => {
      state.loading = false;
      state.userPost = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const { updatePreference } = userPostSlice.actions;

export default userPostSlice.reducer;
