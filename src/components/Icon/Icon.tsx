import React from "react";
import {useFonts} from 'expo-font';
import {createIconSetFromIcoMoon} from '@expo/vector-icons';
import {View, StyleSheet} from "react-native";

const IconMoon = createIconSetFromIcoMoon(
  require('../../../assets/fonts/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
)

function AppLoading() {
  return null;
}

export default function Icon({name, size = 24, color = "black"}) {
  const [fontsLoaded] = useFonts({IcoMoon: require('../../../assets/fonts/icomoon.ttf')});
  if (!fontsLoaded) {
    return <AppLoading/>;
  }

  return (
    <View style={styles.container}>
      <IconMoon name={name} size={size} color={color}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
