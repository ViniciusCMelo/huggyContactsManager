import { StatusBar } from 'expo-status-bar';
import {Roboto_500Medium,Roboto_400Regular, useFonts} from "@expo-google-fonts/roboto";
import {Rubik_500Medium, Rubik_400Regular} from "@expo-google-fonts/rubik";
import Routes from "./src/Routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Rubik_500Medium,
    Rubik_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Routes/>
  );
}
