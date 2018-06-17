'use strict';
import { fromJS } from 'immutable';

import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
} from '../actions/movies';

const initialState = {
  searchedMovies: [],
  isLoading: false,
  isError: false,
  isRefreshing: false
};

export default function popularMovies(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      return {
        isLoading: true,
        isError: false,
        isRefreshing: true
      };
    case GET_MOVIES_SUCCESS:
      return {
        isLoading: false,
        isError: false,
        isRefreshing: false,
        searchedMovies: action.payload,
      };
    case GET_MOVIES_FAILURE:
      return {
        isLoading: false,
        isError: true,
        isRefreshing: false
      };
    default:
      return state;
  }
};
