import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigator } from "react-navigation"; // 1.0.0-beta.14

const Coinscreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Home Screen</Text>
    <Button
      onPress={() => navigation.navigate("Details")}
      title="Go to details"
    />
  </View>
);

const CoinDetails = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Details Screen</Text>
  </View>
);

const RootNavigator = StackNavigator({
  Coin: {
    screen: Coinscreen
  },
  Details: {
    screen: CoinDetails
  }
});

export default RootNavigator;
