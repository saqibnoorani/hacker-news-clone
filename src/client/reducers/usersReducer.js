import { FETCH_ARTICLES } from '../actions/index';
import { HIDE_ARTICLE } from '../actions/index'
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return action.payload;
    case HIDE_ARTICLE:
      return state.filter(art => art.objectID !== action.payload);
    default:
      return state;
  }
};
