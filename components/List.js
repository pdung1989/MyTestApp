import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const url =
  'https://raw.githubusercontent.com/pdung1989/wbma/master/docs/assets/test.json';

const List = () => {
  //fetch data from url
  let mediaArray = [];
  const loadMedia = async () => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
  };

  loadMedia();
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleItem={item} />}
    />
  );
};

export default List;
