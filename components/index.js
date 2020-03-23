import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  HomeScreen,
  FriendScreen,
  HistoryScreen,
  ReceiptScreen
} from '../screens';

const Landing = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="ios-home" color={tintColor} size={25} />
        )
      }
    },
    FriendScreen: {
      screen: FriendScreen,
      navigationOptions: {
        tabBarLabel: 'Friends',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="ios-people" color={tintColor} size={25} />
        )
      }
    },
    HistoryScreen: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="ios-cloud" color={tintColor} size={25} />
        )
      }
    },
    ReceiptScreen: {
      screen: ReceiptScreen,
      navigationOptions: {
        tabBarLabel: 'Receipts',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="ios-wallet" color={tintColor} size={25} />
        )
      }
    }
  },
  {
    initialRouteName: 'HomeScreen'
  }
)

const Router = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Landing: {
      screen: Landing
    }
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
