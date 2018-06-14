"use strict";
import { API_URL } from "../config/config";

//
// Action Types
//

const ADD_MOVIE_REQUEST = "ADD_MOVIE_REQUEST";
const ADD_MOVIE_SUCCESS = "ADD_MOVIE_SUCCESS";
const ADD_MOVIE_FAILURE = "ADD_MOVIE_FAILURE";

const GET_SAVED_MOVIES_REQUEST = "GET_SAVED_MOVIES_REQUEST";
const GET_SAVED_MOVIES_SUCCESS = "GET_SAVED_MOVIES_SUCCESS";
const GET_SAVED_MOVIES_FAILURE = "GET_SAVED_MOVIES_FAILURE";

// Add movie to saved movies
function addMovie(movie) {
  return dispatch => {
    dispatch({ type: ADD_MOVIE_REQUEST });

    fetch(API_URL + '/movies/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie)
    })
    .then(response => response.json())
    .then(data => {
      console.log('msg: ' + JSON.stringify(data));
      dispatch({ type: ADD_MOVIE_SUCCESS, payload: movie });
    })
    .catch(error => {
      console.log('error');
      dispatch({ type: ADD_MOVIE_FAILURE });
    });
  }
}

function getSavedMovies() {

}


export {
  ADD_MOVIE_REQUEST,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
  addMovie,

  GET_SAVED_MOVIES_REQUEST,
  GET_SAVED_MOVIES_SUCCESS,
  GET_SAVED_MOVIES_FAILURE,
  getSavedMovies,
};
