import React from "react";
import {View, Text} from "react-native";
import {BorderlessButton, RectButton} from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native'

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

import {styles} from "../styles/Header";

export default function Header({title, showCancel = true}: HeaderProps) {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/*Borderless Button é para botões sem borda, como textos e ícones.*/}
      <BorderlessButton onPress={navigation.goBack}>
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {showCancel ? (
        <RectButton style={styles.menuButton} onPress={() => {

        }}>
          <Feather name='menu' size={20} color={'#fff'}/>
        </RectButton>
      ) : (
        <View/>
      )}

    </View>
  );
}
