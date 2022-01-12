import {React, useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const url =
  'https://raw.githubusercontent.com/pdung1989/wbma/master/docs/assets/test.json';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);
  //fetch data from url
  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      if(!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      setMediaArray(json);
    } catch (error) {
      console.log(error);
    }
    console.log(mediaArray);
  };

  // call loadMedia() only once when the component is loaded
  useEffect(() => loadMedia(), []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.title}
      renderItem={({item}) => <ListItem singleItem={item} />}
    />
  );
};

export default List;
