"use strict";
import { API_URL,  } from "../config/config";

//
// Action Types
//

const GET_SAVED_MOVIES_REQUEST = "GET_SAVED_MOVIES_REQUEST";
const GET_SAVED_MOVIES_SUCCESS = "GET_SAVED_MOVIES_SUCCESS";
const GET_SAVED_MOVIES_FAILURE = "GET_SAVED_MOVIES_FAILURE";

function getAndSetData() {
  console.log('kääk');

  return dispatch => {
    dispatch({ type: GET_SAVED_MOVIES_REQUEST });

    return fetch(API_URL + '/movies/')
    .then(response => response.json())
    .then(movies => {
      console.log('movies: ' + JSON.stringify(movies));
      dispatch({ type: GET_SAVED_MOVIES_SUCCESS, payload: movies });
    })
    .catch(e => dispatch({ type: GET_SAVED_MOVIES_FAILURE, error: true, payload: e}));
  }
}

export {
  GET_SAVED_MOVIES_REQUEST,
  GET_SAVED_MOVIES_SUCCESS,
  GET_SAVED_MOVIES_FAILURE,
  getAndSetData,
};
