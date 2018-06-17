import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import Card from "../components/Card";
import MySearchBar from "../components/MySearchBar";
import BottomBar from "../components/BottomBar";
import { BASIC_WHITE } from "../config/styles";
import { getAndSetData } from "../actions/app";


class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  componentDidMount() {
    this.initializeApp();
  }

  initializeApp() {
    this.props.dispatch(getAndSetData());
  }

  getCards(movies) {

    if (movies === undefined || movies.length === 0) {
      return [];
    }
    const cards = movies.filter((movie) => movie.status === "Released").map((movie, id) => {
      let backgroundColor = BASIC_WHITE;
      if (id % 2 == 0) {
        backgroundColor = "#F7F7F7"
      }
      return <Card key={ movie.id + id + movie.poster_path } navigation={ this.props.navigation } backgroundColor={ { backgroundColor: backgroundColor } } data={ movie } store={ this.props.store } />;
    });

    return cards;
  }

  render() {
    const { searchedMovies, isLoading } = this.props;
    const cards = this.getCards(searchedMovies);

    return (
      <View style={ styles.container }>
        <StatusBar hidden={ true } />
        <MySearchBar store={ this.props.store } />
        <ScrollView style={ styles.feed }>
          <ActivityIndicator animating={ isLoading } size="large" color="#2B919A" style={ styles.spinner } />
          <View style={ styles.cards }>
            <View style={ styles.searchInfo }>
              <Text style={ styles.found }>{ cards.size } movies found</Text>
            </View>
            {cards}
          </View>
        </ScrollView>
        <BottomBar navigation={ this.props.navigation } store={ this.props.store } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDE2EA",
    alignItems: "center",
    justifyContent: "center",
  },
  feed: {
    width: "100%",
    height: "100%",
  },
  searchInfo: {
    marginHorizontal: 10,
    height: 30,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: "#a4a4a4",
  },
  found: {
    fontSize: 17,
    color: "#a4a4a4",
    fontFamily: "Avenir-Medium",
  },
  spinner: {
    zIndex: 2,
    position: "absolute",
    marginTop: "50%",
    marginHorizontal: "50%",
  },
});

const select = store => {
  return {
    searchedMovies: store.movie.searchedMovies,
    isLoading: store.movie.isLoading,
  };
};

export default connect(select)(HomeScreen);
