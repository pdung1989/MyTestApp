import React, {useState, useContext} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import PropTypes from 'prop-types';
import {Button, Input, Text, Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(
    'https://place-hold.it/300x200&text=Choose'
  );
  const [type, setType] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  //choose image from the phone
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  // reset
  const reset = () => {
    setImage('https://place-hold.it/300x200&text=Choose');
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
  };

  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtention = filename.split('.').pop();
    fileExtention = fileExtention === 'jpg' ? 'jpeg' : fileExtention;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtention,
    });
    // console.log(formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('upload response', response);
      Alert.alert('File', 'uploaded', [
        {
          text: 'Ok',
          onPress: () => {
            // TODO: clear the form values here after submission
            setUpdate(update + 1);
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.log('Upload media problem');
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Image
          source={{uri: image}}
          style={styles.image}
          onPress={pickImage}
        ></Card.Image>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Title"
            />
          )}
          name="title"
        />
        {errors.title && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Description"
            />
          )}
          name="description"
        />
        {errors.description && <Text>This is required.</Text>}

        <Button title="Choose image" onPress={pickImage} />
        <Button
          disabled={!imageSelected}
          loading={loading}
          title="Upload image"
          onPress={handleSubmit(onSubmit)}
        />
        <Button title="Reset" onPress={reset} />
      </Card>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

export default Upload;
