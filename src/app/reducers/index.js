import {combineReducers} from 'redux';
import authReducer from '../../Screens/Login/authSlice';
import postReducer from '../../Screens/Feed/api/postsSlice';
import draftsReducer from '../../Screens/Feed/api/draftSlice';
import netInfoReducer from '../../Screens/Feed/api/netInfoSlice';

export default combineReducers({
  auth: authReducer,
  posts: postReducer,
  drafts: draftsReducer,
  netInfo: netInfoReducer
});
