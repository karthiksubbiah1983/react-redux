import { configureStore } from "@reduxjs/toolkit";

import userPostReducer from "../reducers/userPostSlice";
import userPrefReducer from "../reducers/userPrefSlice";
import availableCountryReducer from "../reducers/availableCountrySlice";

export const store = configureStore({
  reducer: {
    userPost: userPostReducer,
    userPref: userPrefReducer,
    availableCountry: availableCountryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
