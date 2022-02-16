import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";

export default function Login() {
  return(
    <View style={styles.container}>
      <Text style={styles.headline}> Login </Text>
      <Button title={"Fazer Login com a Huggy"} onPress={()=> {}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headline: {
    fontWeight: "400",
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#262626",
    marginBottom: 24,
  }
});
