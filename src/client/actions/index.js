import axios from 'axios';

export const FETCH_ARTICLES = 'fetch_articles';
export const UPDATE_CHARTS = 'update_charts';
export const HIDE_ARTICLE = 'HIDE_ARTICLE';
export const fetchArticles = (page) => async (dispatch) => {
  let url;
  if (page) {
    url = `https://hn.algolia.com/api/v1/search?page=${page}`;
  } else {
    url = `https://hn.algolia.com/api/v1/search?page=1`;
  }

  const res = await axios.get(url);
  const data = res.data.hits.filter(
    (hit) => hit.objectID != null && hit.points != null && hit.title !== ''
  );
  // data.sort((a, b) => a.objectID.localeCompare(b.objectID));
  const columns = [
    { type: 'string', label: 'ID' },
    { type: 'number', label: 'Points' },
  ];
  const chartData = [];
  for (const row of data) {
    const { objectID, points } = row;
    chartData.push([objectID, points]);
  }
  dispatch({
    type: FETCH_ARTICLES,
    payload: res.data.hits.filter(
      (hit) => hit.objectID != null && hit.points != null && hit.title !== ''
    ),
  });
  dispatch({
    type: UPDATE_CHARTS,
    payload: [columns, ...chartData],
  });
};


export const hideArticle = (objectID) => (dispatch) => {
  debugger;
  dispatch({
    type: HIDE_ARTICLE,
    payload: objectID
  });

}