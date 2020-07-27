import { HIDE_ARTICLE, INCREASE_VOTE, FETCH_ARTICLES } from '../actions/index'
export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return action.payload;
    case HIDE_ARTICLE:
      return state.filter(art => art.objectID !== action.payload);
    case INCREASE_VOTE:
      const index = state.findIndex(art => art.objectID == action.payload);
      const votes = JSON.parse(localStorage.getItem('votes'));
      votes[index].points += 1;
      localStorage.setItem('votes', JSON.stringify(votes))
      state[index].points += 1;
      return [...state];
    default:
      return state;
  }
};
