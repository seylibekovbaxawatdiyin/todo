import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    users: [],
    token:localStorage.getItem('token')|| null,
    loading: false,
  },
  reducers: {
    fetching: (state) => {
      state.loading = true;
    },
    fetched: (state, action) => {
      state.users = action.payload;
    },
    fetchingErr: (state) => {
      state.loading = false;
    },
  },
});


export const {fetched, fetching, fetchingErr} = registerSlice.actions
export default registerSlice.reducer
