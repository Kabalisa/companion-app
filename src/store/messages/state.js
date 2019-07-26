import companionAppLogo from '../../assets/icons/companion-logo.png';

export default {
  messages: [
    {
      _id: 1,
      text: 'hello',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Companion App',
        avatar: companionAppLogo
      }
    }
  ]
};
