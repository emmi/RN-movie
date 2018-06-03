"use strict";

//
// Action Types
//
// const GET_SAVED_MOVIES_REQUEST = "GET_SAVED_MOVIES_REQUEST";
// const GET_SAVED_MOVIES_SUCCESS = "GET_SAVED_MOVIES_SUCCESS";
// const GET_SAVED_MOVIES_FAILURE = "GET_SAVED_MOVIES_FAILURE";

const ADD_MOVIE_REQUEST = "ADD_MOVIE_REQUEST";
const ADD_MOVIE_SUCCESS = "ADD_MOVIE_SUCCESS";
const ADD_MOVIE_FAILURE = "ADD_MOVIE_FAILURE";

// Add movie to saved movies
function addMovie(movie) {
  return dispatch => {
    dispatch({ type: ADD_MOVIE_REQUEST });

    let isInvalid = false;
    const movieInformation = { title: movie.get("title"), year: movie.get("release_date") }

    if (isInvalid) {
      dispatch({ type: ADD_MOVIE_FAILURE });
    } else {
      dispatch({ type: ADD_MOVIE_SUCCESS, payload: movieInformation });
    }

  }
}


export {
  // GET_SAVED_MOVIES_REQUEST,
  // GET_SAVED_MOVIES_SUCCESS,
  // GET_SAVED_MOVIES_FAILURE,
  // searchMovies,

  ADD_MOVIE_REQUEST,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
  addMovie,
};
