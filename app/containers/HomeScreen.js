import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import Card from "../components/Card";
import MySearchBar from "../components/MySearchBar";
import BottomBar from "../components/BottomBar";
import { fetchPopularMovies } from "../actions/movies";
import { BASIC_WHITE } from "../config/styles";

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  getCards(movies) {
    const cards = movies.filter((movie) => movie.get("status") === "Released").map((movie, id) => {
      let backgroundColor = BASIC_WHITE;
      if (id % 2 == 0) {
        backgroundColor = "#F7F7F7"
      }
      return <Card key={ movie.get("id") + id + movie.get("poster_path") } navigation={ this.props.navigation } backgroundColor={ { backgroundColor: backgroundColor } } data={ movie } store={ this.props.store } />;
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
        <BottomBar />
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
    searchedMovies: store.movie.get("searchedMovies"),
    isLoading: store.movie.get("isLoading")
  };
};

export default connect(select)(HomeScreen);
