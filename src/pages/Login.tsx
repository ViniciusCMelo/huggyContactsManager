import React, {useContext, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import MainButton from "../components/Button/Button";
import {authenticate} from "../services/api";
import Contacts from "./Contacts";
import AuthContext from "../store/authenticate";
import {useIsFocused} from "@react-navigation/native";

export default function Login({navigation}) {

  const {setAuthenticated, authenticated} = useContext(AuthContext);
  const handleLogin = () => setAuthenticated(true);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (authenticated) {
      navigation.navigate('Contacts');
    }
  }, [isFocused])

  async function authenticateUser() {
    await authenticate().then(() => {
      handleLogin();
      navigation.navigate('Contacts');
    }).catch(error => {
      console.error(error)
      alert('Ops, ocorreu um erro.')
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Login</Text>
      <MainButton text={"Fazer login com a Huggy"} onClick={authenticateUser}/>
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
