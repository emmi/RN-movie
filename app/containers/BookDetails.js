import React from "react";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, Text, View, Image, StatusBar, Button } from "react-native";

class LogoTitle extends React.Component {
  render() {
    console.log('aERaer ' + JSON.stringify(this.props.image));
    return (
      <View>
        <Image
          source={"../../assets/book_default.jpg"}
          style={styles.headerImage}
          />
      </View>
    );
  }
}


export default class BookDetails extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  getStars(votes) {
    let stars = [];

    console.log('votes ' + votes);

    for (let i = 0; i < 5; i++) {
      let starType = "star";
      if (votes < 0.5) {
        starType = "star-o";
      } else if (votes >= 0.5 && votes < 1) {
        starType = "star-half-o";
      }

      stars.push(<Icon key={i} style={styles.star} name={starType} color="#eeca66" size={25} />);
      votes = votes - 1;
    }

    return stars;
  }


  render() {
    const { params } = this.props.navigation.state;
    const stars = this.getStars(params.data.get("vote_average") / 2);

    return (
      <View style={styles.container}>
        <StatusBar  hidden={true} />
        <View style={styles.upperContainer}>
          <Image
            source={{uri: params.image}}
            style={styles.image}
            />
          <View style={styles.titleInfo}>
            <Text style={styles.title}>{params.data.get("title")}</Text>
            <Text style={styles.year}>{moment(params.data.get("date")).format("YYYY") + ' - ' + params.data.get('runtime') + ' minutes'}</Text>
            <View style={styles.stars}>
              {stars}
            </View>
        </View>
          <View style={styles.button}>
            <Button title="Button" color="white" onPress={() => console.log('moi')} />
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
