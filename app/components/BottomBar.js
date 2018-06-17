import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Feather";

class BottomBar extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={ () => console.log('pressed') }>
            <Icon style={styles.icon} name={"home"} color="#2B919A" size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={ () => this.props.navigation.navigate("SavedMovies", {
                store: this.props.store,
                navigation: this.props.navigation
              }) }>
            <Icon style={styles.icon} name={"film"} color="#a4a4a4" size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Icon style={styles.icon} name={"settings"} color="#a4a4a4" size={22} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    backgroundColor: "#F7F7F7",
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 3,
    },
    shadowRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {

  }
});


export default BottomBar;
