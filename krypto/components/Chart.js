import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { View, Image } from "react-native";
import api from "../config/api.js";
import axios from "axios";
import Echarts from "react-native-charting";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";

import { Container, Header, Content, Footer, FooterTab, Button, Text } from "native-base";
export default class CoinChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartLoaded: false,
      CurrentCoinInfo: [],
      coinData: "",
      coinDataDays: [],
      options: [],
      coinTodayInfo: []
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Coin Chart`
  });
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let todaytimestamp = Math.floor(start / 1000);
    let yesterdaytimestamp = todaytimestamp - 86400;
    var d = new Date();
    var thishour = d.getHours();
    let url = `https://min-api.cryptocompare.com/data/histoday?fsym=${params.coinSymbol}&tsym=USD&limit=365&aggregate=1&e=CCCAGG`;

    axios.get(url).then(res => {
      var response = res.data.Data;
      // var percentChange24 = Math.floor(params.percentChange_24h);
      var currentprice = Math.floor(params.coinPrice);
      var sevendaydata = response.map((l, i) => l.close);
      var sevendaydataLow = response.map((l, i) => l.low);
      var sevendaydataOpen = response.map((l, i) => l.open);
      var sevendaydataHigh = response.map((l, i) => l.high);

      var hours = response.map((l, i) => {
        var timestamp = l.time;
        var a = new Date(timestamp * 1000);
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var sec = a.getSeconds();
        var time = month + " " + date + "," + year;
        return time;
      });
      axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.coinSymbol}&tsyms=USD`).then(res => {
        var coinTodayInfo = res.data.DISPLAY[params.coinSymbol].USD;
        this.setState({
          coinTodayInfo: res.data.DISPLAY[params.coinSymbol].USD,
          chartLoaded: true
        });
      });
      this.setState({
        options: {
          title: {
            text: `${params.coinName}`,
            textStyle: {
              color: "#000000"
            }
          },
          tooltip: {
            trigger: "axis"
          },
          grid: {
            left: "0%",
            right: "0%",
            top: "0%",
            backgroundColor: "#ffffff",
            show: "true"
          },
          legend: {
            data: ["USD"],
            x: "left"
          },
          xAxis: {
            show: false,
            type: "category",
            nameLocation: "middle",
            data: hours,
            boundaryGap: false
          },

          yAxis: {
            type: "value",
            show: false,

            position: "left",
            axisLabel: {
              inside: true
            },
            scale: true
            // min: lowestPrice
          },
          toolbox: {},

          dataZoom: [
            {
              type: "inside",
              show: false,
              start: 60
            },
            {
              left: "10%",
              right: "10%",
              start: 0,
              end: 40,
              // end: thishour,
              handleIcon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "100%",
              handleStyle: {
                color: "#d27270",
                shadowBlur: 3,
                shadowColor: "white",
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }
          ],
          series: [
            {
              name: "Price",
              type: "line",
              smooth: true,
              symbol: "none",
              sampling: "average",

              lineStyle: {
                normal: {
                  color: "black",
                  width: 1,
                  shadowColor: "white",
                  shadowOffsetY: 2
                }
              },
              stack: "confidence-band",
              areaStyle: {
                normal: {
                  color: params.percentChange_24h.includes("-") ? "red" : "green"
                }
              },
              data: sevendaydata
            }
          ]
        }
      });
    });

    api.getCoinData().then(res => {
      this.setState({
        coinData: res
      });
    });
  }
  render() {
    const { params } = this.props.navigation.state;
    var coinDataState = this.state.CurrentCoinInfo;
    var coinDataDays = this.state.coinDataDays;
    const tableHead = ["Price", "High", "Low"];
    const tableData = [[this.state.coinTodayInfo["PRICE"], this.state.coinTodayInfo["HIGH24HOUR"], this.state.coinTodayInfo["LOW24HOUR"]]];

    return (
      <Container style={{ backgroundColor: "white" }}>
        {this.state.chartLoaded ? (
          <Container style={{ backgroundColor: "white" }}>
            <Echarts style={{ backgroundColor: "#000000" }} width="100%" option={this.state.options} height={350} onPress={params => console.log(params)} />
            <Text style={{ fontSize: 14, paddingLeft: 10, marginBottom: 10, marginTop: 10 }}>24 Hour Market Data</Text>
            <Table style={{}} borderStyle={{ borderWidth: 0 }}>
              <Row
                data={tableHead}
                borderStyle={{ borderWidth: 0 }}
                style={{ paddingLeft: 10, height: 20, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}
                textStyle={{ color: "black", textAlign: "center" }}
              />
              <Rows
                data={tableData}
                borderStyle={{ borderWidth: 0 }}
                style={{ paddingLeft: 10, height: 20, alignItems: "center", justifyContent: "center" }}
                textStyle={{ color: "black", textAlign: "center" }}
              />
            </Table>
          </Container>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>"Loading..."</Text>
          </View>
        )}
      </Container>
    );
  }
}
