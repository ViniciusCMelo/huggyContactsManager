import React from "react";
import {View, Text} from "react-native";
import {BorderlessButton, RectButton} from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native'
import {styles} from "../styles/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "./Icon/Icon";

interface HeaderProps {
  title: string;
  showCancel?: string;
  rightContent?: React.ReactFragment;
}


export default function NavigationHeader(props: HeaderProps) {
  let title = props.title;
  const navigation = useNavigation();

  async function logout() {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate({name: 'Login'});
    } catch (e) {

    }
  }

  return (
    <View style={styles.container}>
      {props.showCancel ?
        <BorderlessButton style={styles.icon} onPress={() => navigation.goBack()}>
          <Icon name={props.showCancel} size={24} color={"black"}/>
        </BorderlessButton> : null
      }
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {props.rightContent ? props.rightContent :
          <View style={styles.buttonsContainer}>
            <BorderlessButton style={styles.icon} onPress={() => {}}>
              <Icon name="search" size={24} color={"black"}/>
            </BorderlessButton>
            <BorderlessButton style={styles.icon} onPress={() => logout()}>
              <Icon name="logout" size={24} color="black"/>
            </BorderlessButton>
          </View>
        }
      </View>
    </View>
  );
}
