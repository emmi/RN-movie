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
            <Text style={styles.year}> {moment(this.props.data.get("date")).format("YYYY")}</Text>
          </View>
          <View style={styles.reviewBar}>
            <View style={styles.review}>
              {stars}
            </View>
          </View>
          <Text numberOfLines={3} style={styles.description}>{this.props.data.get("overview")}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // // borderColor: "#d4dedf",
    // borderTopWidth: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,

    // shadowOpacity: 0.1,
    borderRadius: 4,
    // shadowOffset: {
    //   height: 7,
    // },
    overflow: 'hidden',
    height: 150,
    // shadowRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
  },
  infoContainer: {
    // borderColor: "#2B919A",
    // borderTopWidth: 5,
    paddingLeft: 10,
    flex: 2.5,
  },
  titleBar: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  reviewBar: {
    // borderWidth: 1,
    marginBottom: 10,
    // alignItems: 'center',
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
    // marginBottom: 0,
    // textAlign: 'center',
    // justifyContent: 'center',
    // borderWidth: 1,
    // borderWidth: 1,
    // height: "100%",
    // textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginRight: 10,
    marginTop: 3,
    color: "#242424",
    fontFamily: "Avenir",
    // marginBottom: 10,
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
    // marginLeft: 10,
    // marginTop: 10,
    // borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

  },
});

const select = store => {
  return {
    movies: store.movie.get("popularMovies")
  };
};

export default connect(select)(Card);
