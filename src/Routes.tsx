import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();
const AppStack = createStackNavigator();

import Login from './pages/Login';
import Header from "./components/Header";

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen component={Login}  name="Login" options={{
          headerShown: false
        }}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
