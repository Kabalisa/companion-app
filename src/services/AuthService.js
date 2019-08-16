import * as Google from 'expo-app-auth';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import config from '../../config';

const { GOOGLE_CLIENT_ID, ANDELA_AUTH_API } = config;
export const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: GOOGLE_CLIENT_ID,
  scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
};

export const getAccessToken = async () => {
  const response = await Google.authAsync(googleConfig);
  const profileData = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${response.accessToken}` }
  });
  let currentUser = {};
  if (profileData.ok) {
    currentUser = await profileData.json();
  }

  if (response.accessToken && response.refreshToken) {
    await axios.post('https://dialogflow-service-companion.herokuapp.com/tokens', {
      accessToken: { [currentUser.email]: response.accessToken }
    });
    return { ...response, currentUser };
  }
  throw new Error('Please make sure to use a valid Andela email');
};

export const getJwtToken = async (accessToken) => {
  const response = await fetch(
    `${ANDELA_AUTH_API}/token?google_token=${accessToken}`
  );

  const data = await response.json();
  switch (response.status) {
    case 200:
      return data;
    case 401:
      throw new Error('You can only login with your Andela email!');
    default:
      throw new Error('We weren\'t able to authenticate you, please try again');
  }
};

export const signOut = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const options = {
        token: accessToken,
        isClientIdProvided: true
      };
      await Google.revokeAsync(googleConfig, options);
    }
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'token']);
    return;
  } catch (error) {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'token']);
    throw new Error(error.message || 'Sign out failed');
  }
};

export const refreshAuth = async () => {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    if (!token) {
      await signOut();
      return false;
    }
    const response = await Google.refreshAsync(googleConfig, token);
    let authState;
    if (response.accessToken) {
      const { accessToken, refreshToken } = response;
      await AsyncStorage.multiSet([
        ['refreshToken', refreshToken || token],
        ['accessToken', accessToken]
      ]);
      authState = true;
    }
    return authState;
  } catch (error) {
    signOut();
    return false;
  }
};
