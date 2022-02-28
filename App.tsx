import {Roboto_500Medium, Roboto_400Regular, useFonts} from "@expo-google-fonts/roboto";
import {Rubik_500Medium, Rubik_400Regular} from "@expo-google-fonts/rubik";
import Routes from "./src/Routes";
import React, {useState} from "react";
import AuthContext from "./src/store/authenticate";
import ContactsContext from "./src/store/contacts";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Rubik_500Medium,
    Rubik_400Regular
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [contacts, setContacts] = useState([]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
      <ContactsContext.Provider value={{contacts,setContacts}}>
        <Routes/>
      </ContactsContext.Provider>
    </AuthContext.Provider>
  );
}
