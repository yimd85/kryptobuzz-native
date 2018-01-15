import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { StackNavigator } from "react-navigation";
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from "native-base";
import Profilesettings from "../screens/Profilesettings.js";
import Holdings from "../screens/Holdings.js";
import Ionicons from "react-native-vector-icons/Ionicons"; // 4.4.2

class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };
  constructor(props) {
    super(props);
    this.state = {
      BtcCoins: 500
    };
  }
  componentDidMount() {}
  render() {
    const myCoins = this.state.BtcCoins;
    console.log("My coins ", myCoins);
    return (
      <Container>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-settings" />
                <Text>Holdings</Text>
              </TabHeading>
            }>
            <Profilesettings />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="ios-settings" />
                <Text>Settings</Text>
              </TabHeading>
            }>
            <Holdings />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export const SimpleApp = StackNavigator({
  Data: { screen: Profile }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp style={{ flex: 1 }} />;
  }
}
