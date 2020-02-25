import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  HomeScreen
} from '../screens';

const Router = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    HomeScreen
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
