import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from 'axios';
export default class CoinTable extends Component {
  constructor(props){
    super(props)
    this.state = {cash : 100}
  }
  componentDidMount(){
    console.log('Making Api Call');
    axios.get('https://bittrex.com/api/v1.1/public/getcurrencies?market=btc-xrp')
      .then(function (response) {
        console.log(response.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const tableHead = ['Coin', 'Holding', 'Price', 'Alert'];
    const tableData = [
      ['1', '2', '3', '4'],
      ['a', 'b', 'c', 'd'],
    ];
    return (
      <View>
        <Table>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  head: { height: 30, backgroundColor: '#000' },
  text: { marginLeft: 5, color: 'white' },
  row: { height: 30 }
})
