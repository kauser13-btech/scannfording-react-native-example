import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {},
  },
  reducers: {
    setCredentials: (state, action) => {
      state.data = action.payload;
    },
    logOut: (state, action) => {
      state.data = {};
    },
  },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state?.persistedReducer?.auth?.data;
export const selectCurrentToken = state => {
  return state?.persistedReducer?.auth?.data?.api_token;
};
