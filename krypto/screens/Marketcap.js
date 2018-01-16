import React, { Component } from "react";
import { Dimensions, Image, WebView, StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";
import axios from "axios";
import { Divider, List, ListItem } from "react-native-elements";
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Button, Left, Body, Right } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Echarts from "react-native-charting";
import api from "../config/api.js";

var width = Dimensions.get("window").width;

class Main extends React.Component {
  static navigationOptions = {
    title: "Coin Pie"
  };
  constructor(props) {
    super(props);
    this.state = { coinData: "", options: [] };
  }

  componentDidMount() {
    var self = this;
    let url = "https://api.coinmarketcap.com/v1/ticker/?limit=10";
    axios.get(url).then(res => {
      var response = res.data;
      function addCommas(nStr) {
        nStr += "";
        var x = nStr.split(".");
        var x1 = x[0];
        var x2 = x.length > 1 ? "." + x[1] : "";
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + "," + "$2");
        }
        return x1 + x2;
      }
      var coinSymbols = response.map((l, i) => l.symbol);
      var marketcap = response.map((l, i) => l.market_cap_usd);
      var names = response.map((l, i) => ({ value: l.market_cap_usd, name: l.symbol }));

      console.log("hum", names);
      console.log(marketcap);
      this.setState({
        options: {
          title: {
            text: "Market Cap",
            subtext: "Top Coins",
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "Market Cap<br>${c}<br> ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "right",
            data: coinSymbols
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: names,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        }
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    // console.log(coinNewsResponse, "this is what your news state looks like");
    return (
      <Container style={{ backgroundColor: "#ffffff" }}>
        <Echarts style={{ backgroundColor: "#ffffff" }} width="100%" option={this.state.options} height={350} />
      </Container>
    );
  }
}

export const SimpleApp = StackNavigator({
  Main: { screen: Main }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp style={{ flex: 1 }} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 200,
    flex: 1,
    backgroundColor: "#e9e9ef",
    alignItems: "center",
    margin: 0,
    borderColor: "red"
  }
});
