import React from "react";
import {View, Text} from "react-native";
import {useNavigation} from '@react-navigation/native'

interface ButtonProps {
  text: string;
  onClick: (e:any) => void;
  icon?: React.ReactNode
}

import {styles} from "./Styles";
import {RectButton} from "react-native-gesture-handler";
import Icon from "../Icon/Icon";

export default function MainButton(props: ButtonProps) {
  const navigation = useNavigation();

  return (
    <View>
      <RectButton style={styles.button} onPress={(e)=> props.onClick(e)}>
        <View style={styles.iconContainer}>{props.icon}</View>
        <Text style={styles.buttonText}> {props.text} </Text>
      </RectButton>
    </View>
  );
}
