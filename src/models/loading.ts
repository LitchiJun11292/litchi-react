import { createSlice } from "@reduxjs/toolkit";

export const loading = createSlice({
  name: "loading",
  initialState: {
    loadingAll: true,
  },
  reducers: {
    setLoadingTrue: (state) => {
      state.loadingAll = true;
    },
    setLoadingFalse: (state) => {
      state.loadingAll = false;
    },
  },
});

export const { setLoadingTrue, setLoadingFalse } = loading.actions;

export default loading.reducer;
