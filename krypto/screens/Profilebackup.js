import React, { Component, FlatList } from "react";
import { Alert, View, Text, Button } from "react-native";
import axios from "axios";
import { Header, Divider, List, ListItem } from "react-native-elements";
import { TabNavigator, StackNavigator } from "react-navigation"; // 1.0.0-beta.14
import HomeScreen from "../screens/Home.js";

export default class StatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinData: [],
      refreshing: false
    };
  }
  componentDidMount() {
    var self = this;
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/?limit=7")
      .then(function(response) {
        // var displayData = response.data.DISPLAY;
        // response.data.map(function(key, value) {
        // console.log("this is your key ", response);
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
    const { navigate } = this.props.navigation;

    const coinData = this.state.coinData;
    // console.log("this is your coinData state ", coinData);

    var allCoins = coinData.map((l, i) => (
      <ListItem
        roundAvatar
        avatar={{ uri: l.avatar_url }}
        key={i}
        title={l.name}
        subtitle={"$" + l.price_usd}
        rightTitle={l.percent_change_24h}
        badge={{
          value: 3,
          textStyle: { color: "white" },
          containerStyle: { backgroundColor: "blue", justifyContent: "center" }
        }}
        onPress={() => navigate("Profile")}
      />
    ));

    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: "Crypto Currencies",
            style: { color: "#fff" }
          }}
        />

        <List containerStyle={{ marginBottom: 20, marginTop: -1 }}>
          {allCoins}
        </List>
      </View>
    );
  }
}
