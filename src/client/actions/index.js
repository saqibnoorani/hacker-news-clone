import axios from 'axios';

export const FETCH_ARTICLES = 'fetch_articles';
export const UPDATE_CHARTS = 'update_charts';
export const HIDE_ARTICLE = 'HIDE_ARTICLE';
export const INCREASE_VOTE = 'INCREASE_VOTE'
export const UPDATE_POINTS_CHART = 'UPDATE_POINTS_CHART'

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
  const storedVotes = JSON.parse(localStorage.getItem("votes"))
  if (!storedVotes) {
    let votes = [];
    data.forEach(hit => {
      votes.push({ objectID: hit.objectID, points: hit.points })
    });
    localStorage.setItem('votes', JSON.stringify(votes));

  } else {
    const localVotes = JSON.parse(localStorage.getItem('votes'))
    data.forEach((vote, index) => {
      localVotes.forEach(element => {
        if (vote.objectID == element.objectID) {
          data[index].points = element.points;
        }

      });
    });
  }

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
    payload: data
  });
  dispatch({
    type: UPDATE_CHARTS,
    payload: [columns, ...chartData],
  });
  // history.push(`/home/${page}`);
};


export const hideArticle = (objectID) => (dispatch) => {
  debugger;
  dispatch({
    type: HIDE_ARTICLE,
    payload: objectID
  });


}


export const upVote = (objectID) => (dispatch) => {
  dispatch({
    type: INCREASE_VOTE,
    payload: objectID
  });
  dispatch({
    type: UPDATE_POINTS_CHART,
    payload: objectID,
  });
}