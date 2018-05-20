
'use strict';
import { fromJS } from 'immutable';

import {
  GET_POPULAR_MOVIES_REQUEST,
  GET_POPULAR_MOVIES_SUCCESS,
  GET_POPULAR_MOVIES_FAILURE,

  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
} from '../actions/movies';

const initialState = fromJS({
  popularMovies: [],
  searchedMovies: [],
  isLoading: false,
  isError: false,
  isRefreshing: false
});

export default function popularMovies(state = initialState, action) {
  switch (action.type) {
    case GET_POPULAR_MOVIES_REQUEST:
      return state.merge({
        isLoading: true,
        isError: false,
        isRefreshing: true
      });
    case GET_POPULAR_MOVIES_SUCCESS:
      return state.merge({
        isLoading: false,
        isError: false,
        isRefreshing: false,
        popularMovies: action.payload
      });
    case GET_POPULAR_MOVIES_FAILURE:
      return state.merge({
        isLoading: false,
        isError: true,
        isRefreshing: false
      });
    case GET_MOVIES_REQUEST:
      return state.merge({
        isLoading: true,
        isError: false,
        isRefreshing: true
      });
    case GET_MOVIES_SUCCESS:
      return state.merge({
        isLoading: false,
        isError: false,
        isRefreshing: false,
        searchedMovies: action.payload,
      });
    case GET_MOVIES_FAILURE:
      return state.merge({
        isLoading: false,
        isError: true,
        isRefreshing: false
      });
    default:
      return state;
  }
};
