import {RectButton} from "react-native-gesture-handler";
import Icon from "./Icon/Icon";
import {StyleSheet, View} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

interface FooterButtonProps {
  destination: string,
  icon: string,
  params?: any
}

export default function FooterButton(props: FooterButtonProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <RectButton style={styles.createFloodButton}
                  onPress={
                    props.params ?
                      () => navigation.navigate({
                        name: `${props.destination}`,
                        params: props.params
                      }) :
                      () => navigation.navigate(`${props.destination}`)}>
        <Icon name={props.icon} size={20} color={'#fff'}/>
      </RectButton>
    </View>)
}
const styles = StyleSheet.create({

  footer: {
    position: 'absolute',
    right: 0,
    bottom: 32,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 48,
    marginRight: 16,
    zIndex: 1000,
  },
  createFloodButton: {
    width: 48,
    height: 48,
    backgroundColor: '#321BDE',
    borderRadius: 28,
  },
  footerText: {
    color: '#8fa7b3',
  },
})
