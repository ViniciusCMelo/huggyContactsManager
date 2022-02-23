import React from "react";
import {View, Text} from "react-native";
import {styles} from "./styles";

interface InitialsProps {
  name: string,
  size?: string
}

export function getInitials(name) {
  let names = name.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function Initials(props: InitialsProps) {
  return (
    <View style={[styles.round,
      props.size === 'lg' && {
        height: 64,
        width: 64,
        borderRadius: 32
      }]}>
      <Text style={[styles.initialsText, {}]}>{props.name}</Text>
    </View>
  )
}
