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
import {Menu, Settings, Home, PlusSquare, Feather} from 'react-native-feather';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <StatusBar backgroundColor="#fafad2" barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          source={require('./assets/kittens.jpeg')}
          style={styles.bgImage}
          imageStyle={{resizeMode: 'cover', borderBottomRightRadius: 65}}
        ></ImageBackground>
        <Menu width={40} height={40} stroke="#ffd700" style={styles.menu} />
        <Settings
          width={40}
          height={40}
          stroke="#ffd700"
          style={styles.setting}
        />
        <Text style={styles.hello}>Hello Kittens!</Text>
      </View>
      <List style={styles.infoArea} />
      <View style={styles.footerArea}>
        <Home width={35} height={35} stroke="#ffd700" />
        <PlusSquare width={35} height={35} stroke="#ffd700" />
        <Feather width={35} height={35} stroke="#ffd700" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 230,
    backgroundColor: '#fafad2',
  },
  menu: {
    position: 'absolute',
    left: 30,
    top: 30,
  },
  setting: {
    position: 'absolute',
    right: 30,
    top: 30,
  },
  bgImage: {
    width: '100%',
    height: 230,
  },
  hello: {
    position: 'absolute',
    top: 150,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ffd700',
    padding: 10,
    color: 'black',
  },
  infoArea: {
    flex: 6,
    flexDirection: 'row',
    marginTop: 50,
  },
  footerArea: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#32cd32',
  },
});
export default App;
