import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, InteractionManager } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {SecurityConfigurationManager} from '../ClientApp/src/library/utils/security-configuration-manager';
import HomeScreen from './src/screens/home/home-screen';

export default function App() {
  //Initialization Logic
  const Stack = createStackNavigator();

  SecurityConfigurationManager.getInstance();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
