import { Google } from 'expo';
import {
  ANDELA_AUTH_API,
  iosClientId,
  androidClientId
} from '../../.env.config.json';

const googleConfig = {
  iosClientId,
  androidClientId,
  scopes: ['profile', 'email']
};

export const getAccessToken = async () => {
  const response = await Google.logInAsync(googleConfig);
  if (response.type === 'success') {
    return response;
  } else {
    throw new Error('Action canceled');
  }
};

export const getJwtToken = async accessToken => {
  const response = await fetch(
    `${ANDELA_AUTH_API}/token?google_token=${accessToken}`
  );
  const data = await response.json();

  if (response.ok && data.token) {
    return data;
  } else if (response.status === 401) {
    throw new Error('Invalid email');
  } else {
    throw new Error('Something went wrong');
  }
};
