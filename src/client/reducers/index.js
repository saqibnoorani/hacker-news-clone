import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import chartsReducer from './chartsReducer'
export default combineReducers({
  articles: usersReducer,
  charts: chartsReducer
});
