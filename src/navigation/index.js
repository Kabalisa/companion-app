import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { ConnectedGreetingsScreen } from '../screens/Greetings';
import Login from '../screens/Login';
import DrawerScreen from '../screens/Drawer';
import OnBoarding from '../screens/OnBoarding';
import Loading from '../screens/Home';
import UserCalendar from '../screens/UserCalendar';

const Main = createStackNavigator(
  {
    Greetings: ConnectedGreetingsScreen,
    UserCalendar: {
      screen: UserCalendar,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    headerMode: 'screen'
  }
);

const Drawer = createDrawerNavigator(
  {
    Main
  },
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
