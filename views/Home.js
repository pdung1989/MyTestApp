import React from 'react';
import {SafeAreaView} from 'react-native';
import GlobalStyles from '../utils/GlobalStyles';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <List />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};
export default Home;
