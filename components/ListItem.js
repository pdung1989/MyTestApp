import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={{uri: props.singleItem.thumbnails.w160}}
          imageStyle={{resizeMode: 'cover'}}
        />
      </View>

      <ScrollView style={styles.textBox}>
        <Text style={styles.title}>{props.singleItem.title}</Text>
        <Text>{props.singleItem.description}</Text>
      </ScrollView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#ffd700',
    padding: 20,
    alignItems: 'flex-start',
    borderRadius: 6,
    marginBottom: 5,
    height: 150,
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
    flex: 3,
    borderBottomLeftRadius: 50,
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
