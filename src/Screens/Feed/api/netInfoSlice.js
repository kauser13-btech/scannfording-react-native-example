import {createSlice} from '@reduxjs/toolkit';

const netInfoSlice = createSlice({
  name: 'netinfo',
  initialState: {
    isConnected: true,
    isInternetReachable: true,
    type: 'wifi',
  },
  reducers: {
    setNetInfo: (state, action) => {
      state = action.payload;
    },
  },
});

export const {setNetInfo} = netInfoSlice.actions;
export default netInfoSlice.reducer;

export const selectNetInfo = state => {
  return state?.persistedReducer?.netinfo;
};
