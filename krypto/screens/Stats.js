import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import axios from "axios";
import { PricingCard } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";

class Coininfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCoinInfo: [],
      GainColor: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Coin Stats`
  });
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

    console.log(params.coinName);
    var self = this;
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
          params.coinSymbol +
          "&tsyms=USD"
      )
      .then(function(response) {
        // console.log("this is the data you need", currentCoinData);
        self.setState({
          CurrentCoinInfo: response.data.DISPLAY[params.coinSymbol].USD
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    const { params } = this.props.navigation.state;

    var coinDataState = this.state.CurrentCoinInfo;
    // console.log("This is the data you got for this coin ", coinDataState);
    return (
      <View>
        <PricingCard
          color="#4f9deb"
          title={params.coinName}
          price={params.coinPrice}
          info={[
            `Open: ${coinDataState.OPENDAY}`,
            `Low: ${coinDataState.LOWDAY}`,
            `High: ${coinDataState.HIGHDAY}`
          ]}
          button={{ title: "BUY NOW", icon: "flight-takeoff" }}
        />
      </View>
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
  componentDidMount() {
    var self = this;
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=20")
      .then(function(response) {
        // var displayData = response.data.DISPLAY;
        // response.data.map(function(key, value) {
        // console.log("this is your key ", response.data);
        self.setState({
          coinData: response.data
        });
        // });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    const coinData = this.state.coinData;

    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content>
          <List>
            {coinData.map((l, i) => (
              <ListItem
                key={i}
                avatar
                style={{ marginLeft: 0 }}
                onPress={() =>
                  navigate("Coininfo", {
                    coinName: l.name,
                    coinPrice: l.price_usd,
                    percentChange_1h: l.percent_change_1h,
                    percentChange_24h: l.percent_change_24h,
                    percentChange_7d: l.percent_change_7d,
                    coinMarketCap: l.market_cap_usd,
                    coinSymbol: l.symbol
                  })
                }
              >
                <Left />
                <Body>
                  <Text>{l.name}</Text>
                  <Text note>{"$" + l.price_usd}</Text>
                </Body>
                <Right>
                  <Text
                    note
                    style={{
                      color: l.percent_change_24h.includes("-")
                        ? "red"
                        : "green"
                    }}
                  >
                    {l.percent_change_24h.includes("-")
                      ? `${l.percent_change_24h}%`
                      : `+${l.percent_change_24h}%`}
                  </Text>
                </Right>
              </ListItem>
            ))}
          </List>
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
