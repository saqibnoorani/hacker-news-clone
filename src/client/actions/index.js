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
    page = 1;
  }

  const res = await axios.get(url);
  let data = res.data.hits.filter(
    (hit) => hit.objectID != null && hit.points != null && hit.title !== ''
  );
  const storedVotes = JSON.parse(localStorage.getItem(`votes${page}`));
  const deletedArticles = JSON.parse(localStorage.getItem(`article${page}`));


  if (deletedArticles) {
    data = data.filter(val => !deletedArticles.includes(val.objectID));

  }
  if (!storedVotes) {
    let votes = [];
    data.forEach(hit => {
      votes.push({ objectID: hit.objectID, points: hit.points })
    });
    localStorage.setItem(`votes${page}`, JSON.stringify(votes));

  } else {
    const localVotes = JSON.parse(localStorage.getItem(`votes${page}`))
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
};


export const hideArticle = (objectID, pageNumber) => (dispatch) => {
  let deletedArticles = JSON.parse(localStorage.getItem(`article${pageNumber}`));
  if (!deletedArticles) {
    deletedArticles = [];
    deletedArticles.push(objectID);
  } else {
    deletedArticles.push(objectID);
  }

  localStorage.setItem(`article${pageNumber}`, JSON.stringify(deletedArticles));
  dispatch({
    type: HIDE_ARTICLE,
    payload: objectID
  });


}


export const upVote = (objectID, pageNumber) => (dispatch) => {
  dispatch({
    type: INCREASE_VOTE,
    payload: { objectID: objectID, pageNumber: pageNumber }
  });
  dispatch({
    type: UPDATE_POINTS_CHART,
    payload: { objectID: objectID, pageNumber: pageNumber }
  });
}