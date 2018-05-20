import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import Card from "../components/Card";
import MySearchBar from "../components/MySearchBar";
import BottomBar from "../components/BottomBar";
import { fetchPopularMovies } from "../actions/movies";


class HomeScreen extends React.Component {

  componentWillMount() {
    this.props.store.dispatch(fetchPopularMovies());
  }

  render() {
    const { searchedMovies, isLoading } = this.props;

    const cards = searchedMovies.map((movie, id) => {
      let backgroundColor = "#fff";
      if (id % 2 == 0) {
        backgroundColor = "#F7F7F7"
      }
      return <Card key={movie.get("id") + id + movie.get("poster_path")} navigation={this.props.navigation} backgroundColor={{backgroundColor: backgroundColor}} data={movie} store={this.props.store} />;
    })

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <MySearchBar store={this.props.store} />
        <ScrollView style={styles.feed}>
          <ActivityIndicator animating={isLoading} size="large" color="#2B919A" style={styles.spinner} />
          <View style={styles.cards}>
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
  cards: {
    position: 'absolute',
    width: "100%",
  },
  spinner: {
    zIndex: 2,
    marginTop: "50%",
  },
});

const select = store => {
  return {
    searchedMovies: store.movie.get("searchedMovies"),
    isLoading: store.movie.get("isLoading")
  };
};

export default connect(select)(HomeScreen);
