import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CoinTable from './components/CoinTable.js';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {cash : 100}
  }
  componentDidMount(){
    console.log('Hello');
  }
  render() {
    let myCash = this.state.cash
    return (
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.balance}>{myCash}</Text>
          </View>
          <View style={styles.center}></View>
          <View style={styles.bottom}>
            <CoinTable />
          </View>
        </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top:{
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#98d2c1',

  },
  balance:{
    fontSize:26,
    marginLeft:10,
  },
  image:{
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth:4,
    borderColor: '#ffffff',
    backgroundColor: '#eee',

  },
  center:{
    height: '1%',
    backgroundColor: '#000000',

  },
  bottom:{
    height: '45%',
    backgroundColor: '#fff',

  }

});
