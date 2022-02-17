import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "../components/Icon/Icon";
import MainButton from "../components/Button/Button";

export default function Contacts({navigation}) {
  const [user, setUser] = useState();
  const getData = () => {
    try {
      AsyncStorage.getItem('user')
        .then(value => {
          if (value !== null || undefined) {
            if (typeof value === "string") {
              setUser(JSON.parse(value))
            }
          } else {
            navigation.navigate("Login")
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/openBook.png')} style={{ width: 200, height: 200 }}/>
      <Text style={styles.lightText}>Ainda não há contatos</Text>
      <MainButton text={"Adicionar Contato"}
                  onClick={()=>{}}
                  icon={<Icon name={'add'} size={18} color={"white"}/>}
      />
    </View>
  )
}
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'white',
    height: '100%'
  },
  lightText: {
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#757575',
    letterSpacing: 0.15,
    lineHeight: 24,
    paddingBottom: 24,
    paddingTop: 16,
  }
})
