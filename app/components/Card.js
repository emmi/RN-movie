import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

class Card extends React.Component {

  getStars(votes) {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      let starType = "star";

      if (votes < 0.5) {
        starType = "star-o";
      } else if (votes >= 0.5 && votes < 1) {
        starType = "star-half-o";
      }

      stars.push(
        <Icon
          key={ i }
          style={ styles.star }
          name={ starType }
          color="#eeca66"
          size={ 12 } />
      );
      votes = votes - 1;
    }

    return stars;
  }

  render() {
    const stars = this.getStars(this.props.data.vote_average / 2);
    const moviePreLink = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

    return (
      <TouchableOpacity style={ [styles.container, this.props.backgroundColor] }
        onPress={ () => this.props.navigation.navigate("BookDetails", {
              image: moviePreLink + this.props.data.poster_path,
              data: this.props.data,
              navigation: this.props.navigation
            }) }>
        <View style={ styles.imageContainer }>
          <Image
            style={ styles.image }
            source={ { uri: moviePreLink + this.props.data.poster_path } }
            />
        </View>
        <View style={ styles.infoContainer }>
          <View style={ styles.titleBar }>
            <Text style={ styles.title }>{ this.props.data.title }</Text>
            <Text style={ styles.year }> { this.props.data.release_year }</Text>
          </View>
          <View style={ styles.reviewBar }>
            <View style={ styles.review }>
              {stars}
            </View>
          </View>
          <Text numberOfLines={ 3 } style={ styles.description }>{ this.props.data.overvie }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,
    borderRadius: 4,
    overflow: 'hidden',
    height: 150,
    backgroundColor: "white",
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
  },
  infoContainer: {
    paddingLeft: 10,
    flex: 2.5,
  },
  titleBar: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  reviewBar: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginRight: 5,
    fontFamily: "Avenir-Medium",
    color: "#4d4e4f",
  },
  review: {
    flexDirection: "row",
  },
  star: {
    marginRight: 1,
  },
  year: {
    fontSize: 11,
    marginRight: 10,
    marginTop: 3,
    color: "#242424",
    fontFamily: "Avenir",
  },
  description: {
    fontSize: 11,
    width: 230,
    textAlign: 'justify',
    color: "#242424",
    fontFamily: "Avenir",
  },
  date: {
    fontSize: 18,
    textAlign: "right",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

const select = store => {
  return {
    movies: store.movie.popularMovies
  };
};

export default connect(select)(Card);
