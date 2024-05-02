import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setCredentials, logOut} from '../../Screens/Login/authSlice';
import {base_url} from '../../config';

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
  prepareHeaders: (headers, {getState}) => {
    const token = getState()?.persistedReducer?.auth?.data?.api_token;
    // console.log("token",getState().persistedReducer);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-type', 'application/json; charset=UTF-8');
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({...refreshResult.data, user}));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
});
