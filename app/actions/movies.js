"use strict";
import moment from "moment";
import { MOVIEDB_API_URL, MOVIEDB_API_KEY, API_URL } from "../config/config";

//
// Action Types
//
const GET_MOVIES_REQUEST = "GET_MOVIES_REQUEST";
const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";

function searchMovies(query) {
  return dispatch => {
    dispatch({ type: GET_MOVIES_REQUEST });
    if (query === "") {
      console.log("Empty query!");
      dispatch({ type: GET_MOVIES_SUCCESS, payload: []});
    }
    else {
      return fetch(MOVIEDB_API_URL + "search/movie?api_key=" + MOVIEDB_API_KEY + "&query=" + query)
      .then(response => response.json())
      .then(movies => {
        const promises = movies.results.map(movie => {
          return fetch(MOVIEDB_API_URL + "movie/" + movie.id + "?api_key=" + MOVIEDB_API_KEY)
          .then(response => response.json())
          .then(responseJSON => {
            if(responseJSON !== null) {
              responseJSON.release_year = moment(responseJSON.release_date).format('YYYY');
              return responseJSON;
            } else {
              return [];
            }
          });
        });

        Promise.all(promises)
        .then(movies => {
          dispatch({ type: GET_MOVIES_SUCCESS, payload: movies });
        });
      })
      .catch(e => dispatch({ type: GET_MOVIES_FAILURE, error: true, payload: e}));
    }
  }
}

export {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  searchMovies
};
