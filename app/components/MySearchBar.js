import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import { searchMovies } from "../actions/movies";
var TimerMixin = require('react-timer-mixin');

class MySearchBar extends React.Component {
  mixins: [TimerMixin]

  constructor(props) {
    super(props);
    this.state = { timer: null };
  }

  search(query) {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.props.dispatch(searchMovies(query));
    }, 500);

  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          containerStyle={ { backgroundColor:'#DDE2EA' } }
          placeholderTextColor='#4d4e4f'
          inputStyle={ { backgroundColor:'#fff', textAlign: 'center' } }
          onChangeText={ (query) => this.search(query) }
          onClear={ () => console.log("moi") }
          placeholder="Search..." />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    marginBottom: 3,
  }
});


export default connect()(MySearchBar);
