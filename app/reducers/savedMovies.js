
'use strict';
import { fromJS } from 'immutable';

import {
  ADD_MOVIE_REQUEST,
  ADD_MOVIE_SUCCESS,
  ADD_MOVIE_FAILURE,
} from '../actions/savedMovies';

import {
  GET_SAVED_MOVIES_REQUEST,
  GET_SAVED_MOVIES_SUCCESS,
  GET_SAVED_MOVIES_FAILURE,
} from '../actions/app';

const initialState = {
  isLoading: false,
  isError: false,
  isRefreshing: false,
  savedMovies: {
    movies: []
  },
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
        savedMovies: {
          movies: [...state.savedMovies.movies, action.payload]
        }
      };
    case ADD_MOVIE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isRefreshing: false
      };
    case GET_SAVED_MOVIES_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isRefreshing: true
      };
    case GET_SAVED_MOVIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isRefreshing: false,
        savedMovies: action.payload,
      };
    case GET_SAVED_MOVIES_FAILURE:
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
