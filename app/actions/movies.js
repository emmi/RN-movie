"use strict";
import { API_URL, API_KEY } from "../config/config";

//
// Action Types
//
const GET_MOVIES_REQUEST = "GET_MOVIES_REQUEST";
const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";

//
// Action Creators
//
// function fetchPopularMovies() {
//   return dispatch => {
//     dispatch({ type: GET_POPULAR_MOVIES_REQUEST });
//     return fetch("https://api.themoviedb.org/3/movie/popular?api_key=bccab329a352ae667d89051331ee8a7c&language=en-US&page=1")
//     .then(response => response.json())
//     .then(movies => {
//       const promises = movies.results.map(movie => {
//         return fetch("https://api.themoviedb.org/3/movie/" + movie.id + "?api_key=bccab329a352ae667d89051331ee8a7c")
//         .then(response => response.json())
//         .then(responseJSON => {
//           if(responseJSON !== null) {
//             return responseJSON;
//           } else {
//             return [];
//           }
//         });
//       });
//
//       Promise.all(promises)
//       .then(movies => {
//         dispatch({ type: GET_POPULAR_MOVIES_SUCCESS, payload: movies });
//       });
//     })
//     .catch(e => dispatch({ type: GET_POPULAR_MOVIES_FAILURE, error: true, payload: e }));
//   }
// }

function searchMovies(query) {
  return dispatch => {
    dispatch({ type: GET_MOVIES_REQUEST });
    if (query === "") {
      console.log("Empty query!");
      dispatch({ type: GET_MOVIES_SUCCESS, payload: []});
    }
    else {
      return fetch(API_URL + "search/movie?api_key=" + API_KEY + "&query=" + query)
      .then(response => response.json())
      .then(movies => {
        const promises = movies.results.map(movie => {
          return fetch(API_URL + "movie/" + movie.id + "?api_key=" + API_KEY)
          .then(response => response.json())
          .then(responseJSON => {
            if(responseJSON !== null) {
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
  searchMovies,
};
