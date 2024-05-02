import {createSlice} from '@reduxjs/toolkit';

const draftsSlice = createSlice({
  name: 'drafts',
  initialState: {
    data: [],
  },
  reducers: {
    setDraftData: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    uploadDraftDataStart: (state, action) => {
      // console.log('Startted ', action.payload, state.data);
      state.data = state.data.map(drf => {
        return drf.id === action.payload.id
          ? {
              ...drf,
              upload_started_at: new Date(),
            }
          : drf;
      });
    },
    requeueDraftData: (state, action) => {
      state.data = state.data.map(drf => {
        return drf.id === action.payload.id
          ? {
              ...drf,
              upload_started_at: null,
            }
          : drf;
      });
    },
    removeFromDraftData: (state, action) => {
      console.log('Remove ', action.payload);
      state.data = state.data.filter(drf => {
        return drf.id !== action.payload.id;
      });
    },
  },
});

export const {
  setDraftData,
  uploadDraftDataStart,
  requeueDraftData,
  removeFromDraftData,
} = draftsSlice.actions;
export default draftsSlice.reducer;

export const totalItemInQueue = state =>
  state?.persistedReducer?.drafts?.data
    ? state.persistedReducer.drafts.data.length
    : 0;
