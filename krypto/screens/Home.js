import React, { Component } from "react";
import { Dimensions, Image, WebView, StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";
import axios from "axios";
import { Divider, List, ListItem } from "react-native-elements";
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Button, Left, Body, Right } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

var width = Dimensions.get("window").width;

const apiKey = "cae50b5832d94f5da2229ba011ff49ab";
class Main extends React.Component {
  static navigationOptions = {
    title: "News Feed"
  };
  constructor(props) {
    super(props);
    this.state = { coinNewsData: [] };
  }
  componentWillMount() {}
  componentDidMount() {
    var self = this;
    axios
      .get("https://newsapi.org/v2/everything", {
        params: {
          sortBy: "publishedAt",
          language: "en",
          sources: "crypto-coins-news",
          page: 2,
          apiKey: apiKey
        }
      })
      .then(function(response) {
        self.setState({
          coinNewsData: response.data.articles
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const coinNewsResponse = this.state.coinNewsData;
    // console.log(coinNewsResponse, "this is what your news state looks like");
    return (
      <Container style={{ backgroundColor: "#e9e9ef" }}>
        <Content>
          {coinNewsResponse.map((l, i) => (
            <View style={{ padding: 0 }} key={i}>
              <View style={styles.box}>
                <Card>
                  <CardItem cardBody>
                    <Image source={{ uri: l.urlToImage }} style={{ height: 150, width: null, flex: 1 }} />
                  </CardItem>
                  <Text style={styles.articleTitle}>{l.title}</Text>
                  <CardItem />
                  <Text style={styles.articleDescription}>{l.description}</Text>
                  <CardItem>
                    <Left>
                      <Text style={styles.author}>{l.author}</Text>
                    </Left>
                    <Body />
                    <Right>
                      <Button
                        transparent
                        onPress={() =>
                          navigate("Article", {
                            title: l.title,
                            author: l.author,
                            description: l.description,
                            published_at: l.publishedAt,
                            articleURL: l.url
                          })
                        }>
                        <Text style={{ color: "#4183f4" }}>Read More</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
            </View>
          ))}
        </Content>
      </Container>
    );
  }
}
class Article extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Article`
  });
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return <WebView source={{ uri: `${params.articleURL}` }} style={{ marginTop: 0 }} />;
  }
}

export const SimpleApp = StackNavigator({
  Main: { screen: Main },
  Article: { screen: Article }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp style={{ flex: 1 }} />;
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
