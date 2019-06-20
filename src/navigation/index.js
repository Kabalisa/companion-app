import { createStackNavigator, createAppContainer } from 'react-navigation';
import GreetingScreen from '../screens/Greetings';
import Login from '../screens/Login';

const AppNavigator = createStackNavigator(
  {
    Login,
    Greetings: GreetingScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
