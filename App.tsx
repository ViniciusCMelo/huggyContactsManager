import {Roboto_500Medium, Roboto_400Regular, useFonts} from "@expo-google-fonts/roboto";
import {Rubik_500Medium, Rubik_400Regular} from "@expo-google-fonts/rubik";
import Routes from "./src/Routes";
import React, {useState} from "react";
import authContext from "./src/store/authenticate";
export const UserContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth) => {
  }
});

export default function App() {
 /* const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Rubik_500Medium,
    Rubik_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }*/
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <authContext.Provider value={{authenticated, setAuthenticated}}>
      <Routes/>
    </authContext.Provider>
  );
}
