import {combineReducers} from 'redux';
import authReducer from '../../Screens/Login/authSlice';
import postReducer from '../../Screens/Feed/api/postsSlice';
import draftsReducer from '../../Screens/Feed/api/draftSlice';

export default combineReducers({
  auth: authReducer,
  posts: postReducer,
  drafts: draftsReducer,
});
