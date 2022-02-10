import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  ButtonGroup,
  ListItem as RNEListItem,
} from 'react-native-elements';
import {Alert} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  const {deleteMedia} = useMedia();

  const {update, setUpdate} = useContext(MainContext);
  // delete single file
  const doDelete = async () => {
    Alert.alert('File', 'Modified', [
      {
        text: 'Ok',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(token, singleMedia.file_id);
            console.log('delete', doDelete);
            response && setUpdate(update + 1);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };
  return (
    <RNEListItem
      bottomDivider
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <Avatar
        size="large"
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
      ></Avatar>
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
        {myFilesOnly && (
          <ButtonGroup
            onPress={(index) => {
              if (index === 0) {
                navigation.navigate('Modify', {file: singleMedia});
              } else {
                Alert.alert('Delete');
                doDelete();
              }
            }}
            buttons={['Modify', 'Delete']}
            rounded
          />
        )}
      </RNEListItem.Content>
      <RNEListItem.Chevron />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default ListItem;
