import React from "react";
import {View, Text, StyleSheet} from "react-native";
import MainButton from "../components/Button/Button";
import {authenticate} from "../services/api";

export default function Login() {

  async function onPressButton() {
    alert("Fui clicado");
    await authenticate();
  }
  return(
    <View style={styles.container}>
      <Text style={styles.headline}> Login </Text>
      <MainButton text={"Fazer login com a Huggy"} onClick={(e)=>onPressButton()}/>
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
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#262626",
    marginBottom: 24,
  }
});
