import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "./userPostSlice";

type InitialState = {
  loading: boolean;
  userPost: UserProfile[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  userPost: [],
  error: "",
};

export const postUserPreference = createAsyncThunk(
  "user/updatePreference",
  async (userProfile: UserProfile, thunkAPI) => {
    const response = await fetch("http://localhost:3002/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile),
    });

    if (!response.ok) {
      const error = await response.json();
      return thunkAPI.rejectWithValue(error);
    }

    const data = await response.json();

    return data;
  }
);

const userPostSlice = createSlice({
  name: "updatePreference",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postUserPreference.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      postUserPreference.fulfilled,
      (state, action: PayloadAction<UserProfile[]>) => {
        state.loading = false;
        state.userPost = action.payload;
        state.error = "";
      }
    );
    builder.addCase(postUserPreference.rejected, (state, action) => {
      state.loading = false;
      state.userPost = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default userPostSlice.reducer;
