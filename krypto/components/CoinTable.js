import React, { Component } from "react";
import { Platform,View,Text, FlatList, StyleSheet } from "react-native";
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {List, ListItem } from 'react-native-elements'
import axios from 'axios';



export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      coins: ['les','lester','hello'],
      coinData: [],
      currentCoinPrice: []
    }
  }
  componentDidMount(){
    var self = this;
    axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,XRP&tsyms=USD')
    .then(function (response) {
    var displayData = response.data.DISPLAY
    console.log('this is the data you need', Object.keys(displayData));
    self.setState({
      coinData : displayData.XRP.USD
    })

  })
  .catch(function (error) {
    console.log(error);
  });


  }

  render() {
setTimeout(() => {
    var self = this;
    axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,XRP&tsyms=USD')
    .then(function (response) {
    var displayData = response.data.DISPLAY
    console.log('this is the data you need', Object.keys(displayData));
    self.setState({
      coinData : displayData.XRP.USD
    })

  })
  .catch(function (error) {
    console.log(error);
  });



}, 500000)



    const dataresponse = this.state.coinData;
    console.log("This is pure response", {dataresponse});
    const list = [
      {
        title: 'Bitcoin',
        icon: 'av-timer'
      },
      {
        title: 'Trips',
        icon: 'flight-takeoff'
      }
    ]
    console.log('render funlistction response ',list);
    var objectResponse = [dataresponse]
    console.log('render keys for response ',objectResponse);
    var displayDataKeys = Object.keys(dataresponse).map((key) =>{
      // console.log('these are your '+ [key] + dataresponse[key]);


    });


  // setTimeout(() => {




    return (

      <List>
      {
        objectResponse.map((item, i) => (
          <ListItem
          key={i}
          title={item.PRICE}
          subtitle={item.CHANGEPCTDAY}

      />
    ))
  }
</List>

    )
  }
}

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
title: { flex: 1, backgroundColor: '#f6f8fa' },
row: { height: 28 },
text: { textAlign: 'center' }
})
