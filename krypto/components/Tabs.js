import React from "react";
import { View, Text } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation"; // 1.0.0-beta.14
import Ionicons from "react-native-vector-icons/Ionicons"; // 4.4.2
import NewsFeed from "../screens/Home.js";
import Marketcap from "../screens/Marketcap.js";
import StatScreen from "../screens/Stats.js";

const RootTabs = TabNavigator({
  Home: {
    screen: NewsFeed,
    navigationOptions: {
      tabBarLabel: "News",
      headerTitleStyle: { color: "green" },
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={focused ? "ios-list-box" : "ios-list-box-outline"} size={26} style={{ color: tintColor }} />
    }
  },
  Stats: {
    screen: StatScreen,
    navigationOptions: {
      tabBarLabel: "Stats",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={focused ? "ios-stats" : "ios-stats-outline"} size={26} style={{ color: tintColor }} />
    }
  },
  Market: {
    screen: Marketcap,
    navigationOptions: {
      tabBarLabel: "Market",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={focused ? "ios-easel" : "ios-easel-outline"} size={26} style={{ color: tintColor }} />
    }
  }
});

export default RootTabs;
