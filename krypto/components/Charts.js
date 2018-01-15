import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { View } from "react-native";
import api from "../config/api.js";
import axios from "axios";
import Echarts from "react-native-charting";

import { Container, Header, Content, Footer, FooterTab, Button, Text } from "native-base";
export default class CoinChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCoinInfo: [],
      coinData: "",
      coinDataDays: [],
      options: []
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Coin Chart`
  });
  componentWillMount() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let todaytimestamp = Math.floor(start / 1000);
    let yesterdaytimestamp = todaytimestamp - 86400;
    var d = new Date();
    var thishour = d.getHours();
    let url = `https://min-api.cryptocompare.com/data/histohour?fsym=${params.coinSymbol}&tsym=USD&limit=${thishour}&aggregate=1&e=CCCAGG`;
    axios.get(url).then(res => {
      var response = res.data.Data;
      var percentChange24 = Math.floor(params.percentChange_24h);
      var currentprice = Math.floor(params.coinPrice);
      var sevendaydata = response.map((l, i) => l.close);
      var hours = response.map((l, i) => i);
      this.setState({
        options: {
          title: {
            text: `${params.coinName}`
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["USD"]
          },
          xAxis: {
            type: "category",
            nameLocation: "middle",

            data: hours,
            boundaryGap: false
          },
          yAxis: {
            type: "value",
            position: "left",
            boundaryGap: [0, "10%"],
            scale: true
            // min: lowestPrice
          },
          toolbox: {},
          dataZoom: [
            {
              type: "inside",
              start: 0
            },
            {
              start: 0,
              end: thishour,
              handleIcon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "80%",
              handleStyle: {
                color: "#fff",
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
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
              itemStyle: {
                normal: {
                  color: "#c23531"
                }
              },
              areaStyle: {
                normal: {
                  color: ["#c23531"]
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
    return (
      <Container>
        <Content>
          <Echarts option={this.state.options} height={300} onPress={params => console.log(params)} />
        </Content>
      </Container>
    );
  }
}
