/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import * as React from 'react';
import {StyleSheet, View,} from 'react-native';
import Router from './routes/index';
import FlashMessage from 'react-native-flash-message';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Router/>
          <FlashMessage position="top"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
