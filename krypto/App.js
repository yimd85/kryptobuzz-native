import React, { Component } from "react";
import { View, Text } from "react-native";
import { TabNavigator } from "react-navigation"; // 1.0.0-beta.14
import Ionicons from "react-native-vector-icons/Ionicons"; // 4.4.2

import RootTabs from "./components/Tabs.js";

// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: ["les", "lester", "hello"],
      coinData: [],
      currentCoinPrice: []
    };
  }

  render() {
    return <RootTabs />;
  }
}
