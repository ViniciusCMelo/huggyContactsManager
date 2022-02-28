import React, {useState} from "react";
import {Text, TouchableHighlight, TouchableHighlightComponent, TouchableOpacity, View} from "react-native";
import Initials from "../Initials/Initials";
import {styles} from "./styles";
import {useNavigation} from '@react-navigation/native';
import {RectButton} from "react-native-gesture-handler";


interface ItemProps {
  name: string,
  initials: string,
  indexLetter: {
    letter: string,
    status: boolean
  },
  id: string,
}

export default function Item(props: ItemProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLetter}>
        {!props.indexLetter.status ?
          <Text style={styles.indexLetter}>
            {props.indexLetter.letter}
          </Text> :
          <Text style={styles.indexLetter}/>}
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate({
          name: 'ContactDetail',
          params: {id: props.id, name: props.name}
        })}
        underlayColor={'#F8F8F8'}
      >
        <View style={styles.row}>
          <Initials name={props.initials}/>
          <Text style={styles.title}>{props.name}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )

}
