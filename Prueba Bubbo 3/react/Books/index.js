

import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
/*
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/