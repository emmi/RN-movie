import React from "react";
import moment from "moment";
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
          key={i}
          style={styles.star}
          name={starType}
          color="#eeca66"
          size={12} />
      );
      votes = votes - 1;
    }

    return stars;
  }

  render() {
    const stars = this.getStars(this.props.data.get("vote_average") / 2);
    const moviePreLink = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

    return (
      <TouchableOpacity style={[styles.container, this.props.backgroundColor]}
        onPress={() => this.props.navigation.navigate("BookDetails", {
              image: moviePreLink + this.props.data.get("poster_path"),
              data: this.props.data,
              navigation: this.props.navigation
            })}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: moviePreLink + this.props.data.get("poster_path")}}
            />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.data.get("title")}</Text>
            <View style={styles.review}>
              {stars}
            </View>
          </View>
          <Text style={styles.year}>{moment(this.props.data.get("date")).format("YYYY")}</Text>
          <Text numberOfLines={3} style={styles.description}>{this.props.data.get("overview")}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderRadius: 10,
    borderColor: "#d4dedf",
    // marginLeft: 10,
    // marginRight: 10,
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 7,
    },
    overflow: 'hidden',
    height: 150,
    shadowRadius: 10,
    backgroundColor: "white",
    // marginBottom: 7,
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
    fontSize: 10,
    color: "#242424",
    fontFamily: "Avenir",
    marginBottom: 10,
  },
  description: {
    fontSize: 11,
    width: 240,
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
    flex: 1,
  },
});

const select = store => {
  return {
    movies: store.movie.get("popularMovies")
  };
};

export default connect(select)(Card);
