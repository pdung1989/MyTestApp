import {useEffect, useState, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl, appId} from '../utils/variables';

// fetch data from endpoint
const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`

        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// useMedia hook to handle state of media
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update} = useContext(MainContext);

  const loadMedia = async (start = 0, limit = 10) => {
    setLoading(true);
    try {
      // const response = await fetch(`${baseUrl}tags/${appId}`);
      // if (!response.ok) {
      //   throw Error(response.statusText);
      // }
      // const json = await response.json();
      const json = await useTag().getFileByTag(appId);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          return mediaData;
        })
      );
      setMediaArray(media);
      //console.log(mediaArray);
      //media && setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // Call loadMedia() only once when the component is loaded
  // OR when the update state (MainContext) is changed
  useEffect(() => {
    loadMedia(0, 5);
  }, [update]);

  // upload media
  const postMedia = async (formData, token) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };
    const result = await doFetch(baseUrl + 'media', options);
    result && setLoading(false);
    return result;
  };

  return {mediaArray, postMedia, loading};
};

// create useLogin hook for handling login
const useLogin = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(baseUrl + 'login', options);
  };

  return {postLogin};
};

// useUser hook to handle user token
const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    return await doFetch(baseUrl + 'users/user', options);
  };
  // add new user
  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  // modify user
  const putUser = async (data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  // check user name if it is already used
  const checkUsername = async (username) => {
    const result = await doFetch(baseUrl + 'users/username/' + username);
    return result.available;
  };

  return {getUserByToken, postUser, checkUsername, putUser};
};

const useTag = () => {
  const postTag = async (tagData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(tagData),
    };
    return await doFetch(baseUrl + 'tags/', options);
  };

  const getFileByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };
  return {postTag, getFileByTag};
};

export {useMedia, useLogin, useUser, useTag};
