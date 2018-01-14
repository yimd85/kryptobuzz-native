import React from "react";
import { AppRegistry, StyleSheet, View, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import axios from "axios";
import api from "../config/api.js";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { PropTypes } from "react";
import PureChart from "react-native-pure-chart";

import { PricingCard } from "react-native-elements";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
import Echarts from "react-native-charting";

class Coininfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCoinInfo: [],
      coinData: "",
      coinDataDays: [],
      options: {}
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Coin Stats`
  });
  componentWillMount() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    let dateTime = Date.now();
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let todaytimestamp = Math.floor(start / 1000);
    let yesterdaytimestamp = todaytimestamp - 86400;
    console.log(todaytimestamp);
    console.log(yesterdaytimestamp);
    var self = this;
    api.getlast7().then(res => {
      self.setState({
        coinDataDays: res
      });
    });

    var self = this;
    api.getCoinData().then(res => {
      this.setState({
        coinData: res
      });
    });
    let url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + params.coinSymbol + "&tsyms=USD";
    return axios.get(url).then(res =>
      self.setState({
        CurrentCoinInfo: res.data.DISPLAY[params.coinSymbol].USD
      })
    );

    this.setState({
      options: options
    });
  }
  render() {
    const { params } = this.props.navigation.state;
    var coinDataState = this.state.CurrentCoinInfo;
    var coinDataDays = this.state.coinDataDays;
    var coinSevenDays = coinDataDays["Data"];
    // var options = this.state.options;
    console.log("render api ", coinSevenDays);
    // const map1 = coinSevenDays.map((x, y) => x);
    // console.log(maplop;1);

    // coinSevenDays.map((l, i) => console.log("key value pairs", i));
    var hours = ["00", "01"];
    let option = {
      title: {
        text: "Bitcoin Yesterday"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["USD"]
      },
      xAxis: {
        data: ["01", "02", "03"]
      },
      yAxis: {
        splitLine: {
          show: false
        }
      },
      toolbox: {},
      dataZoom: [
        {
          startValue: "2018-00-01"
        },
        {
          type: "inside"
        }
      ],
      series: [
        {
          name: "USD",
          type: "line",
          data: [20, 40, 50],
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      ]
    };
    // console.log(option);
    return (
      <Container>
        <Content>
          <Echarts option={option} height={300} onPress={params => console.log(params)} />
        </Content>
      </Container>
    );
  }
}
class CoinData extends React.Component {
  static navigationOptions = {
    title: "Coins"
  };
  constructor(props) {
    super(props);
    this.state = {
      coinData: [],
      percent: 2
    };
  }
  componentWillMount() {
    api.getCoinData().then(res => {
      console.log(res);
      this.setState({
        coinData: res
      });
    });
  }

  render() {
    const coinData = this.state.coinData;
    // console.log("this is api response", this.state.coinApi);
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          {coinData.map((l, i) => (
            <ListItem
              key={i}
              avatar
              style={{ marginLeft: 0 }}
              onPress={() =>
                navigate("Coininfo", {
                  coindData: l,
                  coinName: l.name,
                  coinPrice: l.price_usd,
                  percentChange_1h: l.percent_change_1h,
                  percentChange_24h: l.percent_change_24h,
                  percentChange_7d: l.percent_change_7d,
                  coinMarketCap: l.market_cap_usd,
                  coinSymbol: l.symbol
                })
              }>
              <Left />
              <Body>
                <Text>{l.name}</Text>
                <Text note>{"$" + l.price_usd}</Text>
              </Body>
              <Right>
                <Text
                  note
                  style={{
                    color: l.percent_change_24h.includes("-") ? "red" : "green"
                  }}>
                  {l.percent_change_24h.includes("-") ? `${l.percent_change_24h}%` : `+${l.percent_change_24h}%`}
                </Text>
              </Right>
            </ListItem>
          ))}
        </Content>
      </Container>
    );
  }
}

export const SimpleApp = StackNavigator({
  Data: { screen: CoinData },
  Coininfo: { screen: Coininfo }
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
