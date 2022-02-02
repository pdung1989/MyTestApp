import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import PropTypes from 'prop-types';
import {Button, Input, Text, Card} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {useMedia} from '../hooks/ApiHooks';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconsdb.com%2Fcaribbean-blue-icons%2Fupload-2-icon.html&psig=AOvVaw3E7CSaR2mf3WIytf6P2dkE&ust=1643889762624000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJiIgN784PUCFQAAAAAdAAAAABBV'
  );
  const [type, setType] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia} = useMedia;

  const {
    control,
    handleSubmit,
    formState: {errors},
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
    }
  };

  const onSubmit = async (date) => {
    if (!imageSelected) {
      Alert.alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtention = filename.split('.').pop();
    fileExtention = fileExtention === 'jpg' ? 'jpeg' : 'jpeg';
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtention,
    });
    // console.log(formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('upload response', response)
    } catch (error) {
      console.log('Upload media problem')
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
        <Button title="Upload image" onPress={handleSubmit(onSubmit)} />
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
    marginBottom: 30,
  },
});

export default Upload;
