import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Button, Left, Body, Right } from "native-base";
import { Dimensions, Image, WebView, StyleSheet, Text, View } from "react-native";

var width = Dimensions.get("window").width;

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    {
      setInterval(() => {
        this.props.navigation.navigate("Home");
      }, 2500);
    }
  }
  render() {
    // console.log(coinNewsResponse, "this is what your news state looks like");
    return (
      <Container style={{ backgroundColor: "#e9e9ef" }}>
        <Text>Welcome to splash</Text>
      </Container>
    );
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
  },
  box: {
    width: width * 1,
    flex: 1,
    paddingBottom: 3,
    backgroundColor: "#e9e9ef"
  },
  articleTitle: {
    fontSize: 14,
    marginLeft: 13,
    marginRight: 3,
    marginTop: 10,
    fontWeight: "bold"
  },
  articleDescription: {
    fontSize: 14,
    marginLeft: 13,
    marginRight: 3
  },
  title: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold"
  },
  author: {
    margin: 0,
    padding: 0,
    fontSize: 12
  }
});
