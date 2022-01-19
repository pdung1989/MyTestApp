import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {View} from 'react-native';
import Home from './views/Home';

const App = () => {
  return (
    <>
      <Home />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
