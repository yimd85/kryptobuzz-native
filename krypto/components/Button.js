import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 10,
    width: 175,
    backgroundColor: "#00aeef",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontWeight: "300",
    fontSize: 16
  }
});

export { Button };
