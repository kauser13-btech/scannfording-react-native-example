import {createSlice} from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    pagination: {},
  },
  reducers: {
    setPostData: (state, action) => {
      if (action?.payload?.data) {
        state.data =
          action.payload.pagination.current_page > 1
            ? [...state.data, ...action.payload.data]
            : action.payload.data;
        state.pagination = action.payload.pagination;
      }
    },

    appendPostData: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    updatePostImages: (state, action) => {
      state.data = state.data.map(post => {
        return post.id === action.payload.post_id
          ? {
              ...post,
              images: post.images
                ? [action.payload, ...post.images]
                : [action.payload],
            }
          : post;
      });
    },
  },
});

export const {setPostData, appendPostData, updatePostImages} =
  postsSlice.actions;
export default postsSlice.reducer;
export const selectPostsList = state => state?.persistedReducer?.posts?.data;
export const selectPostsPagination = state =>
  state?.persistedReducer?.posts?.pagination;
