import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Container, Header, Content, Item, Input } from "native-base";

import { TabNavigator } from "react-navigation"; // 1.0.0-beta.14
import * as firebase from "firebase";
import { Button } from "../components/Button";

export default class Loginscreen extends Component {
  state = {
    email: "",
    password: "",
    authenticating: false
  };
  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBwbH5cXI7D0sD1hKXpY_e3Z41HI0mvlZ4",
      authDomain: "krypto-a1d46.firebaseapp.com"
    };
    firebase.initializeApp(firebaseConfig);
  }
  constructor(props) {
    super(props);
    this.state = {
      profilesettings: 0,
      coins: ["les", "lester", "hello"],
      coinData: [],
      currentCoinPrice: []
    };
  }
  onPressSignIn() {
    this.setState({
      authenticating: true
    });
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user =>
        this.setState({
          authenticating: false,
          user,
          error: ""
        })
      )
      .catch(() => {
        // Login was not successful

        this.setState({
          authenticating: false,
          user: null,
          error: "Authentication Failure"
        });
      });
  }
  onPressRegister() {
    this.setState({
      authenticating: true
    });

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user =>
        this.setState({
          authenticating: false,
          user,
          error: ""
        })
      )
      .catch(() => {
        // Login was not successful

        this.setState({
          authenticating: false,
          user: null,
          error: "Registration Failure"
        });
      });
  }
  onPressLogOut() {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          this.setState({
            email: "",
            password: "",
            authenticating: false,
            user: null
          });
        },
        error => {
          console.error("Sign Out Error", error);
        }
      );
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (this.state.user !== null) {
      return (
        <View style={styles.form}>
          <Text>Logged In</Text>
          <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
        </View>
      );
    }
    return (
      <Container>
        <Header />
        <Content>
          <Item>
            <Input placeholder="Enter your email..." label="Email" onChangeText={email => this.setState({ email })} value={this.state.email} placeholder="Underline Textbox" />
          </Item>
          <Item>
            <Input placeholder="Enter your password..." label="Password" secureTextEntry onChangeText={password => this.setState({ password })} value={this.state.password} />
          </Item>
          <Item>
            <Button onPress={() => this.onPressRegister()}>Log In</Button>
          </Item>
          <Text>{this.state.error}</Text>
        </Content>
      </Container>
    );
  }
  render() {
    return <View style={styles.form}>{this.renderCurrentState()}</View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  form: {
    flex: 1
  }
});
