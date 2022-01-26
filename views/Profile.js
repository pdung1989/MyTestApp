import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Avatar} from 'react-native-elements';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFileByTag} = useTag();

  // fetch the avatar by tag
  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFileByTag('avatar_' + user.user_id);
      const avatar = avatarArray[0].filename;
      setAvatar(uploadsUrl + avatar);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>{user.username}</Text>
      <Avatar
        activeOpacity={0.2}
        containerStyle={{backgroundColor: '#BDBDBD'}}
        onPress={() => alert('onPress')}
        rounded
        size="xlarge"
        source={{uri: avatar}}
        title="P"
      />
      <Text>{user.email}</Text>
      <Text>{user.full_name}</Text>
      <Button title={'Logout!'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
