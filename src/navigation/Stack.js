import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../../screens/Home';
import Game from '../../screens/game';

const stack = createStackNavigator();

const Stack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name='Home' component={Home}
      options={{
        headerShown:false
      }}/>
      <stack.Screen name='game' component={Game}
      options={{
        
      }}/>
    </stack.Navigator>
  )
}

export default Stack