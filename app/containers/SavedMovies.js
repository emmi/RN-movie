import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Card from "../components/Card";
import { BASIC_WHITE } from "../config/styles";

class BookDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  generateCards(movies) {
    const cards = movies.map((movie, id) => {
      let backgroundColor = BASIC_WHITE;
      if (id % 2 == 0) {
        backgroundColor = "#F7F7F7"
      }
      return <Card key={ movie.id + id + movie.poster_path } navigation={ this.props.navigation } backgroundColor={ { backgroundColor: backgroundColor } } data={ movie } store={ this.props.store } />;
    });

    return cards;
  }

  render() {
    const { savedMovies } = this.props;
    const cards = this.generateCards(savedMovies);

    return (
      <View style={ styles.container }>
        {cards}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
  }
});

const select = store => {
  return {
    savedMovies: store.savedMovies.savedMovies.movies,
  };
};

export default connect(select)(BookDetails);
