import React from "react";
import { View, Text } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation"; // 1.0.0-beta.14
import Ionicons from "react-native-vector-icons/Ionicons"; // 4.4.2
import HomeScreen from "../screens/Home.js";
import ProfileScreen from "../screens/Profile.js";
import StatScreen from "../screens/Stats.js";
import Coindetails from "../screens/Coindetails.js";

const RootTabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "News",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={focused ? "ios-home" : "ios-home-outline"} size={26} style={{ color: tintColor }} />
    }
  },
  Stats: {
    screen: StatScreen,
    navigationOptions: {
      tabBarLabel: "Stats",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={focused ? "ios-stats" : "ios-stats-outline"} size={26} style={{ color: tintColor }} />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={focused ? "ios-settings" : "ios-settings-outline"} size={26} style={{ color: tintColor }} />
    }
  }
});

export default RootTabs;
