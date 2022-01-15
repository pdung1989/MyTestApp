import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Text,
} from 'react-native';
import GlobalStyles from './utils/GlobalStyles';
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <StatusBar backgroundColor="orange" barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          source={require('./assets/kittens.jpeg')}
          style={styles.bgImage}
          imageStyle={{resizeMode: 'cover', borderBottomRightRadius: 65}}
        ></ImageBackground>
        <Text style={styles.hello}>Hello Kittens!</Text>
      </View>
      <List style={styles.infoArea} />
      <View style={styles.footerArea} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 270,
    backgroundColor: 'white',
  },
  bgImage: {
    width: '100%',
    height: 270,
  },
  hello: {
    position: 'absolute',
    top: 200,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#f0e68c',
    padding: 10,
    color: '#008000',
  },
  infoArea: {
    flex: 6,
    flexDirection: 'row',
    backgroundColor: 'skyblue',
  },
  footerArea: {
    flex: 1,
    backgroundColor: 'steelblue',
  },
});
export default App;
