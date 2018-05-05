console.disableYellowBox = true;

import React from "react";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import TestReducer from './app/reducers/movies';
import BookDetails from "./app/containers/BookDetails";
import HomeScreen from "./app/containers/HomeScreen";

class Root extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#67ACFD',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const reducers = {
      movie: TestReducer,
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
        <HomeScreen navigation={this.props.navigation} store={store}/>
      </Provider>
    );
  }
}

const RootStack = StackNavigator(
  {
    HomeScreen: {
      screen: Root,
    },
    BookDetails: {
      screen: BookDetails,
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
)

export default RootStack;