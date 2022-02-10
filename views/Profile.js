import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Image, View, ScrollView} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Text, Divider, Icon, Button, Card} from 'react-native-elements';
import {PropTypes} from 'prop-types';

const Profile = ({navigation}) => {
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
    <ScrollView>
      <Card>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 20,
          }}
        >
          <Icon name="person" size="40" style={{paddingRight: 20}} />
          <Text h3 h3Style={{color: 'green'}}>
            {user.username}
          </Text>
        </View>
        <Divider />
        <Image
          source={{uri: avatar}}
          style={{
            width: '100%',
            height: '40%',
            marginTop: 30,
            marginBottom: 30,
          }}
          resizeMode="contain"
        />
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>Fullname: {user.full_name}</Text>
        <Divider />
        <Button
          title={'Logout'}
          onPress={logout}
          buttonStyle={{
            backgroundColor: 'rgba(127, 220, 103, 1)',
            borderRadius: 3,
          }}
          titleStyle={{fontWeight: 'bold', fontSize: 28}}
          containerStyle={{
            marginHorizontal: 30,
          }}
        />
        <Button
          title="Modify user"
          onPress={() => {
            navigation.navigate('Modify user');
          }}
        />
        <Button title='My Files' onPress={() => navigation.navigate('My Files')}/>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: 40,
  // },
  text: {
    marginLeft: 50,
    color: 'green',
    marginBottom: 10,
    fontSize: 20,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
