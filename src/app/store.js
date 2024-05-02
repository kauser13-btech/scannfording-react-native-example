import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './api/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from '../app/reducers';
import {processDrafts} from '../Utils/queue';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['auth', 'drafts'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      apiSlice.middleware,
    ),
  devTools: true,
});

setInterval(async () => {
  await processDrafts();
}, 5000);

export const rehydrateStore = persistStore(store);
