import { StatusBar } from 'expo-status-bar';
import {Roboto_500Medium,Roboto_400Regular, useFonts} from "@expo-google-fonts/roboto";
import Routes from "./src/Routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Routes/>
  );
}
