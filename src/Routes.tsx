import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();
const AppStack = createStackNavigator();

import Login from './pages/Login';
import Contacts from './pages/Contacts'
import Header from "./components/Header";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen component={Login}  name="Login" options={{
          headerShown: false
        }}/>
        <AppStack.Screen component={Contacts}  name="Contacts" options={{
          headerShown: true,
          header: () => <Header title={"Contacts"} showCancel={true}/>
        }}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
