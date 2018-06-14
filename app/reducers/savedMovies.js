
'use strict';
import { fromJS } from 'immutable';

import {
  // GET_SAVED_MOVIES_REQUEST,
  // GET_SAVED_MOVIES_SUCCESS,
  // GET_SAVED_MOVIES_FAILURE,
  ADD_MOVIE_REQUEST,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
} from '../actions/savedMovies';

const initialState = {
  isLoading: false,
  isError: false,
  isRefreshing: false,
  savedMovies: [],
};

export default function popularMovies(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isRefreshing: true
      };
    case ADD_MOVIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isRefreshing: false,
        savedMovies: [...state.savedMovies, action.payload]
      };
    case ADD_MOVIE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isRefreshing: false
      };
    default:
      return state;
  }
};
