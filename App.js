console.disableYellowBox = true;

import React from "react";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import TestReducer from './app/reducers/movies';
import SavedMoviesReducer from './app/reducers/savedMovies';
import BookDetails from "./app/containers/BookDetails";
import HomeScreen from "./app/containers/HomeScreen";

class Root extends React.Component {
  static navigationOptions = {
    title: 'Home',
    header: 'null'
  };

  render() {
    const reducers = {
      movie: TestReducer,
      savedMovies: SavedMoviesReducer,
    };

    const loggerMiddleware = createLogger()
    const reducer = combineReducers(reducers);
    const store = createStore(
      reducer,
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
      )
    );

    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

const RootStack = StackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    BookDetails: {
      screen: BookDetails,
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
)

export default Root;
