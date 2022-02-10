import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Card, Button, ListItem, Text} from 'react-native-elements';
import {Video} from 'expo-av';
import {useUser, useFavourite, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Single = ({route}) => {
  // console.log('route:', route);
  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const {getFileByTag} = useTag();
  const {postFavourite, getFavouritesByFileId, deleteFavourite} =
    useFavourite();
  const {user} = useContext(MainContext);

  const [owner, setOwner] = useState({username: 'fetching...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/180');
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (error) {
      // TODO: how should user be notified?
      console.error('fetch owner error', error);
      setOwner({username: '[not available]'});
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFileByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
      console.log('single.js avatar ', avatar);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file.file_id);
      setLikes(likesData);
      // TODO: check if user id of of logged in user is included in data and
      // set state userLike accordingly
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      // TODO: how should user be notified?
      console.error('fetchLikes() error', error);
    }
  };

  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(true);
    } catch (error) {
      // TODO: what to do if user has liked this image already?
      console.error('createFavourite error', error);
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (error) {
      // TODO: what to do if user has not liked this image already?
      console.error('removeFavourite error', error);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  // reload everytime userLike changes
  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  return (
    <ScrollView>
      <Card>
        <Card.Title h4>{file.title}</Card.Title>
        <Card.Title>{file.time_added}</Card.Title>
        <Card.Divider />
        {file.media_type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + file.filename}}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <Video
            ref={videoRef}
            style={styles.image}
            source={{
              uri: uploadsUrl + file.filename,
            }}
            // usePoster not working in IOS now..
            usePoster
            posterSource={{
              uri: uploadsUrl + file.screenshot,
            }}
            useNativeControls={true}
            isLooping
            resizeMode="contain"
            onError={(error) => {
              console.error('<Video> error', error);
            }}
          ></Video>
        )}
        <Card.Divider />
        <Text style={styles.description}>{file.description}</Text>
        <ListItem>
          <Avatar source={{uri: avatar}} />
          <Text>{owner.username}</Text>
        </ListItem>
        <ListItem>
          <Text>Likes count: {likes.length}</Text>
          <Button
            disabled={userLike}
            title="Like"
            onPress={() => {
              createFavourite();
            }}
          ></Button>
          <Button
            disabled={!userLike}
            title="Unlike"
            onPress={() => {
              removeFavourite();
            }}
          ></Button>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
