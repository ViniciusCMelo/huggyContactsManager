import React from "react";
import {View, Text} from "react-native";
import {BorderlessButton, RectButton} from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native'
import {styles} from "../styles/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createIconSetFromIcoMoon} from "@expo/vector-icons";
import {useFonts} from "expo-font";

const Icon = createIconSetFromIcoMoon(
  require('../../assets/fonts/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

function AppLoading() {
  return null;
}

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

export default function Header({title, showCancel = true}) {


  const [fontsLoaded] = useFonts({IcoMoon: require('../../assets/fonts/icomoon.ttf')});
  if (!fontsLoaded) {
    return <AppLoading/>;
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem('user');
    } catch (e) {
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <BorderlessButton onPress={() => {
      }}>
        <Icon name="search" size={24} color={"black"}/>
      </BorderlessButton>

      {showCancel ? (
        <BorderlessButton onPress={() => logout()}>
          <Icon name="logout" size={24} color="black"/>
        </BorderlessButton>
      ) : (
        <View/>
      )}

    </View>
  );
}
