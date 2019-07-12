import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';
import GreetingScreen from '../screens/Greetings';
import Login from '../screens/Login';
import DrawerScreen from '../screens/Drawer';
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

const Drawer = createDrawerNavigator(
  { Main },
  { contentComponent: DrawerScreen }
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
    Drawer
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(AppNavigator);
