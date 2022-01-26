import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFileByTag} = useTag();

  const fetchAvatar = async () => {
    const avatarArray = await getFileByTag('avatar_' + user.user_id);
    const avatar = avatarArray[0].filename;
    setAvatar(uploadsUrl + avatar);
  };

  useEffect(() => {
    fetchAvatar();
  }, [])

  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>{user.username}</Text>
      <Image
        source={{uri: avatar}}
        style={{width: '90%', height: '80%'}}
        resizeMode="contain"
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
