import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ApartScreen from './screens/ApartScreen';
import HouseScreen from './screens/HouseScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'In The House Apps' }} 
        />
        <Stack.Screen 
          name="Apart" 
          component={ApartScreen} 
          options={{ title: 'In The House Apps' }} 
        />
        <Stack.Screen 
          name="House" 
          component={HouseScreen} 
          options={{ title: 'In The House Apps' }} 
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'In The House Apps' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}