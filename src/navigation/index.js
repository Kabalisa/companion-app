import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import GreetingScreen from '../screens/Greetings';
import Login from '../screens/Login';
import OnBoarding from '../screens/OnBoarding';
import Loading from '../screens/Home';
const Main = createStackNavigator(
  {
    Greetings: GreetingScreen
  },
  {
    headerMode: 'screen'
  }
);
const Auth = createStackNavigator(
  {
    Login,
    OnBoarding
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);
const AppNavigator = createSwitchNavigator(
  {
    Loading,
    Auth,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(AppNavigator);
