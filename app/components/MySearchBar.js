import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";

class MySearchBar extends React.Component {

  render() {


    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={() => console.log("moi")}
          onClear={() => console.log("moi")}
          placeholder='Search...' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "98%",
  }
});


export default MySearchBar;
