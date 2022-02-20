import React from "react";
import {View, Text} from "react-native";
import {style} from "./styles";

interface InfoCardProps {
  title: string,
  info: [{
    title: string,
    content: string
  }]

}

export default function InfoCard(props: InfoCardProps) {
  return (
    <View style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.title}>{props.title}</Text>
      </View>
      {props.info.map(info => {
        return (
          <View  style={style.infoContainer} key={info.title}>
            <Text style={style.infoTitle}>{info.title}</Text>
            <Text style={style.infoContent}>{info.content}</Text>
          </View>
        )
      })}
    </View>
  )
}
