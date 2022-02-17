import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import MainButton from "../components/Button/Button";
import {authenticate} from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";

export default function Login({navigation}) {
  const [user, setUser] = useState();

  async function onPressButton() {
    await authenticate().then(res => {
      console.log(res.data)
      setUser(res.data)
    });
  }

  const storeUser = async (user: any) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }

  // @ts-ignore
  useEffect(async () => {
    await storeUser(user).then(navigation.navigate("Contacts"));
  }, [user])

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Login</Text>
      <MainButton text={"Fazer login com a Huggy"} onClick={(e) => onPressButton()}/>
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
