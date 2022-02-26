import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import MainButton from "../components/Button/Button";
import {authenticate} from "../services/api";
import Contacts from "./Contacts";
import authContext from "../store/authenticate";

export default function Login({navigation}) {

  const {setAuthenticated} = useContext(authContext);
  const handleLogin = () => setAuthenticated(true);

  async function onPressButton() {
    await authenticate().then(() => {
      handleLogin();
      navigation.navigate('Contacts');
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Login</Text>
      <MainButton text={"Fazer login com a Huggy"} onClick={onPressButton}/>
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
    fontFamily: "Roboto_500Medium",
    color: "#262626",
    marginBottom: 24,
  }
});
