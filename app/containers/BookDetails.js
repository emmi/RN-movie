import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native";
import { addMovie } from "../actions/savedMovies";

class BookDetails extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  getStars(votes) {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      let starType = "star";
      if (votes < 0.5) {
        starType = "star-o";
      } else if (votes >= 0.5 && votes < 1) {
        starType = "star-half-o";
      }

      stars.push(<Icon key={ i } style={ styles.star } name={ starType } color="#eeca66" size={ 25 } />);
      votes = votes - 1;
    }

    return stars;
  }

  addToSaved(movie) {
    // TODO: move somewhere else
    const movieInfo = {
      id: movie.id,
      title: movie.title,
      release_year: movie.release_year,
      runtime: movie.runtime,
      genres: movie.genres,
      status: movie.status,
      overview: movie.overview,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }

    this.props.dispatch(addMovie(movieInfo));
  }


  render() {
    const { params } = this.props.navigation.state;
    const stars = this.getStars(params.data.vote_average / 2);

    return (
      <View style={ styles.container }>
        <StatusBar  hidden={ true } />
        <View style={ styles.upperContainer }>
          <Image
            source={ { uri: params.image } }
            style={ styles.image }
            />
          <View style={ styles.titleInfo }>
            <Text style={ styles.title }>{ params.data.title }</Text>
            <Text style={ styles.year }>{ params.data.release_year + ' - ' + params.data.runtime + ' minutes' }</Text>
            <View style={ styles.stars }>
              {stars}
            </View>
        </View>
          <View style={ styles.button }>
            <Button title="Button" color="white" onPress={ () => this.addToSaved(params.data) } />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
  },
  button: {
    bottom: 0,
    width: "100%",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#67AAAA",
    alignSelf: 'center',
    position: 'absolute',
  },
  stars: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  star: {
    marginRight: 3,
  },
  upperContainer: {
    height: 190,
    borderRadius: 4,
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: "#DDE2EA"
  },
  image: {
    height: 150,
    width: 100,
    borderRadius: 5,
    position: 'absolute',
    top: -30,
    left: 15,
  },
  headerImage: {
    width: 380,
    height: 155
  },
  titleInfo: {
    width: "60%",
    marginTop: 10,
    alignSelf: 'flex-end'
  },
  title: {
    fontSize: 18,
    fontFamily: 'AppleSDGothicNeo-SemiBold',
  },
  year: {
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    fontSize: 11
  }
});

export default connect()(BookDetails);
