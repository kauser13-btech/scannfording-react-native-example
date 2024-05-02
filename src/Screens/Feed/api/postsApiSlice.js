import {apiSlice} from '../../../app/api/apiSlice';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: (page = 1) => `/posts?page=${page}`,
      keepUnusedDataFor: 5,
    }),
    savePost: builder.mutation({
      query: data => ({
        url: '/posts',
        method: 'POST',
        body: {...data},
        redirect: 'follow',
      }),
    }),

    saveImages: builder.mutation({
      query: data => ({
        url: '/posts/images',
        method: 'POST',
        body: {...data},
        redirect: 'follow',
      }),
    }),
  }),
});

export const {
  useLazyGetPostsQuery,
  useSavePostMutation,
  useSaveImagesMutation,
} = postsApiSlice;
