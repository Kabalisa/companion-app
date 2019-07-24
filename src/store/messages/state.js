import initialMessage from '../../constants/initialMessage';
import companionAppLogo from '../../assets/icons/companion-logo.png';

export default {
  messages: [
    {
      _id: 1,
      text: initialMessage('Ebun'),
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Companion App',
        avatar: companionAppLogo
      }
    }
  ]
};
