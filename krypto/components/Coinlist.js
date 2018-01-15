import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { View } from "react-native";
import api from "../config/api.js";
import axios from "axios";
import Echarts from "react-native-charting";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
export default class CoinList extends Component {
  static navigationOptions = {
    title: "Coins"
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
                navigate("CoinChart", {
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
