import React from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import Card from "../components/Card";
import { fetchPopularMovies } from '../actions/movies';


class HomeScreen extends React.Component {

  componentWillMount() {
    this.props.store.dispatch(fetchPopularMovies());
  }

  render() {
    const { movies } = this.props;

    const cards = movies.map((movie) => {
      console.log('movie ' + JSON.stringify(movie));
      return <Card key={movie.get('title')} navigation={this.props.navigation} data={movie} store={this.props.store} />;
    })

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <ScrollView style={styles.feed}>
          {cards}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#DDE2EA",
    alignItems: "center",
    justifyContent: "center",
  },
  feed: {
    width: "100%",
    height: "100%",
    paddingTop: 10,
  },
});

const select = store => {
  return {
    movies: store.movie.get('popularMovies')
  };
};

export default connect(select)(HomeScreen);
