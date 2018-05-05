import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{"Header".toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    // borderWidth: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    zIndex: 2,
    paddingLeft: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Arial",
    color: "#50C074",
  }
});
