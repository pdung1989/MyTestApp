import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={{uri: uploadsUrl + props.singleMedia.thumbnails.w160}}
        />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.title}>{props.singleItem.title}</Text>
        <Text>{props.singleItem.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#cea0e8',
    padding: 20,
    alignItems: 'flex-start',
    borderRadius: 6,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  textBox: {
    fontSize: 20,
    flex: 1,
    paddingLeft: 15,
  },
  imageBox: {
    flex: 1,
  },
  image: {
    flex: 2,
    borderRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

ListItem.propTypes = {
  singleItem: PropTypes.object.isRequired,
};

export default ListItem;
