import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { StyleSheet, Text, View } from "react-native";
export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["NY", "NY", "NY", "NY", "NY", "NY", "NY"],
        datasets: [
          {
            label: "Population",
            data: [488, 388, 288, 558, 448, 668, 888],
            backgroundColor: [
              "rgba(255,99,132, 0.6)",
              "rgba(255,99,132, 0.6)",
              "rgba(255,99,132, 0.6)",
              "rgba(255,99,132, 0.6)",
              "rgba(255,99,132, 0.6)",
              "rgba(255,99,132, 0.6)",
              "rgba(255,99,132, 0.6)"
            ]
          }
        ]
      }
    };
  }
  render() {
    return (
      <View>
        <Bar
          data={this.state.chartData}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false
          }}
        />
      </View>
    );
  }
}
