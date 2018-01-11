import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import axios from "axios";
import { Header, Divider, List, ListItem } from "react-native-elements";

class CoinData extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <List containerStyle={{ marginBottom: 20, marginTop: -1 }} />
      </View>
    );
  }
}

export const SimpleApp = StackNavigator({
  Data: { screen: CoinData }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp style={{ flex: 1 }} />;
  }
}
