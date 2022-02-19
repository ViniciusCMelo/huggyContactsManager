import React from "react";
import {View, Text} from "react-native";
import {styles} from "./styles";

interface InitialsProps {
  name: string
}

export function getInitials(name) {
  let names = name.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}


export default function Initials(props: InitialsProps){
  return(
    <View style={styles.round}>
      <Text style={styles.initialsText}>{props.name}</Text>
    </View>
  )
}
