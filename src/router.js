import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screans/login-screan';
import AmbienceScreen from './screans/ambience-screan';
import CreateUserScrean from "./screans/create-user-screan";

const AppNavigator = createStackNavigator({
  CreateUser: { screen: CreateUserScrean },
  Login: { screen: LoginScreen },
  Ambiences: { screen: AmbienceScreen },
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;