import {RectButton} from "react-native-gesture-handler";
import Icon from "./Icon/Icon";
import {View} from "react-native";
import React from "react";
import {styles} from "../pages/Contacts";
import {useNavigation} from "@react-navigation/native";

interface FooterButtonProps {
  destination: string,
  icon: string,
}

export default function FooterButton(props: FooterButtonProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <RectButton style={styles.createFloodButton}
        // @ts-ignore
                  onPress={() => navigation.navigate(`${props.destination}`)}>
        <Icon name={props.icon} size={20} color={'#fff'}/>
      </RectButton>
    </View>)
}
