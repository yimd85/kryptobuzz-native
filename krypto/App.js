import React, { Component } from "react";
import { View, Text } from "react-native";
import { TabNavigator } from "react-navigation"; // 1.0.0-beta.14
import Loading from "./config/load.js";
import RootTabs from "./components/Tabs.js";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <RootTabs />;
  }
}
