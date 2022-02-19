import React from "react";
import {Text, TouchableHighlight, TouchableHighlightComponent, View} from "react-native";
import Initials from "../Initials/Initials";
import {styles} from "./styles";
import {RectButton} from "react-native-gesture-handler";


interface ItemProps {
  name: string,
  initials: string,
  indexLetter: boolean,
}
export default function Item(props: ItemProps) {
  return (
    <View style={styles.container}>
      {props.indexLetter ? <Text style={styles.indexLetter}>A</Text> : <View/>}
    <TouchableHighlight style={styles.button} onPress={() => { }} underlayColor={'#F8F8F8'}>
      <View style={styles.row}>
        <Initials name={props.initials}/>
        <Text style={styles.title}>{props.name}</Text>
      </View>
    </TouchableHighlight>
    </View>
  )

}
