import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
export default class Holdings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { BtcCoins: "" };
  }
  componentWillMount() {
    this.setState({
      BtcCoins: 600
    });
  }
  render() {
    return (
      <View>
        <Text>These are your holdings</Text>
      </View>
    );
  }
}
