import React from "react";
import { AppRegistry, StyleSheet, View, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import api from "../config/api.js";
import CoinChart from "../components/Charts.js";
import CoinList from "../components/Coinlist.js";

export const SimpleApp = StackNavigator({
  CoinList: { screen: CoinList },
  CoinChart: { screen: CoinChart }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
styles = StyleSheet.create({
  head: { height: 40, backgroundColor: "#f1f8ff" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 28 },
  text: { textAlign: "center" },
  percentChange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 0,
    color: "red",
    fontSize: 12
  }
});
