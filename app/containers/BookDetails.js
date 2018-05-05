import React from "react";
import moment from "moment";
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


  render() {
    const { params } = this.props.navigation.state;

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
          </View>
          <View style={styles.button}>
            <Button title="Button" color="white" />
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
    // borderWidth: 1,
    bottom: -15,
    // flex: 1,
    width: "35%",
    fontSize: 3,
    borderRadius: 4,
    backgroundColor: "#67ACAA",
    alignSelf: 'center',
    position: 'absolute',
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
    // borderWidth: 1,
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
