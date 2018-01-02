import React, {Component} from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';


class LoginScreen extends Component {
  render() {
    return(
      <View>
        <Text>This is log in screen</Text>
        <Button onPress={() => this.props.navigation.navigate('HomeScreen')} title="Home" />
      </View>
    );

  }
}

export default LoginScreen;
