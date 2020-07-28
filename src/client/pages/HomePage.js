/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types'; // ES6
import Moment from 'react-moment';
import { fetchArticles, hideArticle, upVote } from '../actions';
import { Chart } from 'react-google-charts';
const HomePage = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const nextPage = () => {
    let count = pageNumber;
    setPageNumber(count += 1);
    loadArticles(count)
  };
  const previousPage = () => {
    let count = pageNumber;
    setPageNumber(count -= 1);
    loadArticles(count)
  };

  const hideStory = (id) => {
    hideNews(id, pageNumber);
  }

  const voteUp = (id) => {
    increaseVote(id, pageNumber);
  }
  const date = new Date();

  const parseURL = (url) => {
    if (url) {
      const pathArray = url.split('//');
      return pathArray[1].split('/')[0];
    }
  };

  const renderArticles = () => {
    return props.articles.map((article) => (
      <tr>
        <td>
          <table
            style={{ border: 0, cellPadding: 0, cellSpacing: 0, width: `${100}%` }}
            className="itemlist"
          >
            <tbody style={{ fontSize: 'small' }}>
              <tr className="athing row" id="23953944">
                <td style={{ align: 'right', valign: 'top' }} className="title col-md-1 col-sm-1">
                  <span>{article.num_comments}</span>
                </td>
                <td style={{ align: 'right', valign: 'top' }} className="title col-md-1 col-sm-1">
                  <span >{article.points}</span>
                </td>
                <td valign="top" className="votelinks col-md-1 col-sm-1">
                  <center>
                    <span style={{ cursor: 'pointer' }} onClick={() => { voteUp(article.objectID) }} className="fa fa-caret-up" title="upvote" />
                  </center>
                </td>
                <td className="title col-md-9 col-sm-9">
                  <span className="storylink font-weight-bold">{article.title}</span>
                  <span className="sitestr badge-pill font-weight-lighter">
                    {parseURL(article.url)} by
                  </span>
                  <span>{article.author}</span>
                  <span className="badge-pill font-weight-lighter">
                    <Moment diff={article.created_at} unit="days">
                      {date}
                    </Moment>{' '}
                    days ago.
                  </span>
                  <span style={{ cursor: 'pointer' }} onClick={() => { hideStory(article.objectID) }}> [Hide]</span>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    ));
  };

  const renderChart = () => {
    return (
      <Chart
        height={'300px'}
        width={'100%'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={props.charts}
        options={{
          pointSize: 5,
          hAxis: {
            title: 'ID',
          },
          vAxis: {
            title: 'Votes',
          },
        }}
      />
    );
  };
  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Hacker News - Saqib Noorani</title>
        <meta property="og:title" content="Hacker News- Saqib Noorani" />
        <meta
          name="description"
          content="Latest Hacker News Articles"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" to="https://ycombinator-clone.herokuapp.com/" />
      </Helmet>
    );
  };

  const { fetchArticles: loadArticles } = props;
  const { hideArticle: hideNews } = props;
  const { upVote: increaseVote } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
    loadArticles(pageNumber);
  }, [loadArticles]);
  return (
    <center>
      <table
        className="table-active"
        id="hnmain"
        style={{ border: 0, cellPadding: 0, cellSpacing: 0, width: '85%', bgcolor: '#f6f6ef' }}
      >
        <tbody>
          <tr>
            <td bgcolor="#ff6600">
              <table
                style={{ border: 0, cellPadding: 0, cellSpacing: 0, width: '85%', padding: '2px' }}
              >
                <tbody>
                  <tr style={{ fontSize: 'smaller' }} className="row text-light">
                    <td className="col-md-1 col-sm-1 m-r-1 pt-md-4 pt-1 ml-2">Comments</td>
                    <td className="col-md-1 col-sm-1 m-r-1 pt-1 ml-2">Vote Count</td>
                    <td className="col-md-1 col-sm-1 m-r-1 pt-md-4 pt-1 ml-2">UpVote</td>
                    <td className="col-md-8 col-sm-8 pt-md-4 pt-1 ml-2">News Details</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr id="pagespace" title="" style={{ height: '15px' }}></tr>
          {renderArticles()}
          <tr id="pagespace" title="" style={{ height: '10px' }}>
            <td style={{ textAlign: 'end', color: '#ff6600' }}>
              <span style={{ cursor: 'pointer' }}>
                {pageNumber > 1 ? <span onClick={previousPage}>Previous |</span> : ''}
                <span onClick={nextPage}>Next</span>
              </span>
            </td>
          </tr>

          <tr id="pagespace" title="" style={{ height: '10px' }}></tr>
          <table width="100%" cellSpacing="0" cellPadding="1">
            <tbody>
              <tr>
                <td bgcolor="#ff6600"></td>
              </tr>
            </tbody>
          </table>
          <table width="100%" cellSpacing="0" cellPadding="1">
            <tbody>
              <tr>
                <td>{renderChart()}</td>
              </tr>
            </tbody>
          </table>
          <table width="100%" cellSpacing="0" cellPadding="1">
            <tbody>
              <tr>
                <td bgcolor="#ff6600"></td>
              </tr>
            </tbody>
          </table>
        </tbody>
      </table>
    </center>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    charts: state.charts,
  };
};

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchArticles()); // Manually dispatch a network request
};

HomePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  chartData: PropTypes.arrayOf(PropTypes.any),
  fetchArticles: PropTypes.func,
  hideArticle: PropTypes.func,
  upVote: PropTypes.func
};

HomePage.defaultProps = {
  articles: [],
  chartData: [],
  fetchArticles: null,
  hideArticle: null,
  upVote: null
};

export default {
  component: connect(mapStateToProps, { fetchArticles, hideArticle, upVote })(HomePage),
  loadData,
};
