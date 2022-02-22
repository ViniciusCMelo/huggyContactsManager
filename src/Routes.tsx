import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();
const AppStack = createStackNavigator();

import Login from './pages/Login';
import Contacts from './pages/Contacts'
import NavigationHeader from "./components/NavigationHeader";
import CreateContact from "./pages/CreateContact";
import ContactDetail from "./pages/ContactDetail";
import EditContact from "./pages/EditContact";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen component={Login}  name="Login" options={{
          headerShown: false
        }}/>
        <AppStack.Screen component={Contacts}  name="Contacts" options={{
          headerShown: true,
          header: () => <NavigationHeader title={"Contatos"}/>
        }}/>
        <AppStack.Screen component={CreateContact}  name="CreateContact" options={{
          headerShown: true,
          header: () => <NavigationHeader title={"Criar Contato"}/>
        }}/>
        <AppStack.Screen
          component={ContactDetail}
          name="ContactDetail"
          options={{
          headerShown: false,
        }}/>
        <AppStack.Screen
          component={EditContact}
          name="EditContact"
          options={{
            headerShown: false,
            header: () => <NavigationHeader
              title={'Editar Contato'}
              showCancel={'close'}
            />,
          }}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
