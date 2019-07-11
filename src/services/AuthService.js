import { Google } from 'expo';
import config from '../../config';

const { IOS_CLIENT_ID, ANDROID_CLIENT_ID, ANDELA_AUTH_API } = config;
const googleConfig = {
  iosClientId: IOS_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  scopes: ['profile', 'email']
};

export const getAccessToken = async () => {
  const response = await Google.logInAsync(googleConfig);
  if (response.type === 'success') {
    return response;
  }
  throw new Error('Action canceled');
};

export const getJwtToken = async (accessToken) => {
  const response = await fetch(
    `${ANDELA_AUTH_API}/token?google_token=${accessToken}`
  );
  const data = await response.json();

  if (response.ok && data.token) {
    return data;
  }
  if (response.status === 401) {
    throw new Error('Invalid email');
  } else {
    throw new Error('Something went wrong');
  }
};
