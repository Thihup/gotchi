
import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../scenes/Login';
import Character from '../scenes/Character';

export default createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  Home: {
    screen: Character,
  },
});