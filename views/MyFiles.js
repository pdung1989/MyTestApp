import {Text, TextPropTypes, View} from 'react-native';
import React, {Component} from 'react';
import List from '../components/List';
import {PropTypes} from 'prop-types';

const MyFiles = ({navigation}) => {
  return (
    <View>
      <List navigation={navigation} myFilesOnly={true}/>
    </View>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
