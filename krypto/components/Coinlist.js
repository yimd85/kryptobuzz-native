import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { View } from "react-native";
import api from "../config/api.js";
import axios from "axios";
import Echarts from "react-native-charting";
import { Container, Header, Content, List, ListItem, Item, Icon, Input, Button, Left, Body, Right, Thumbnail, Text } from "native-base";
export default class CoinList extends Component {
  static navigationOptions = {
    title: "Coins",
    headerStyle: { backgroundColor: "white" },
    headerTitleStyle: { color: "black" }
  };
  constructor(props) {
    super(props);
    this.state = {
      coinData: []
    };
  }

  componentWillMount() {
    api.getCoinData().then(res => {
      this.setState({
        coinData: res
      });
    });
  }

  render() {
    const coinData = this.state.coinData;
    // console.log("this is api respons?e", this.state.coinApi);
    const { navigate } = this.props.navigation;
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
    return (
      <Container>
        <Content>
          {coinData.map((l, i) => (
            <ListItem
              key={i}
              avatar
              style={{ marginLeft: 0 }}
              onPress={() =>
                navigate("CoinChart", {
                  coindData: l,
                  coinName: l.name,
                  coinPrice: l.price_usd,
                  percentChange_1h: l.percent_change_1h,
                  // percentChange_24h: l.percent_change_1h,
                  percentChange_7d: l.percent_change_7d,
                  coinMarketCap: l.market_cap_usd,
                  coinSymbol: l.symbol
                })
              }>
              <Left />
              <Body>
                <Text>{l.name}</Text>
                <Text
                  style={{
                    color: l.percent_change_1h.includes("-") ? "red" : "green"
                  }}
                  note>
                  {"$" + addCommas(l.price_usd)}
                </Text>
              </Body>
              <Right>
                <View
                  style={{
                    borderRadius: 4,
                    borderWidth: 0.5,
                    padding: 8,
                    borderColor: l.percent_change_1h.includes("-") ? "red" : "green"
                  }}>
                  <Text
                    note
                    style={{
                      color: l.percent_change_1h.includes("-") ? "red" : "green"
                    }}>
                    {l.percent_change_1h.includes("-") ? `${l.percent_change_1h}%` : `+${l.percent_change_1h}%`}
                  </Text>
                </View>
              </Right>
            </ListItem>
          ))}
        </Content>
      </Container>
    );
  }
}
