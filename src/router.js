import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screans/login-screan';
import Ambientescreen from './screans/ambientes-screan';
import CreateUserScrean from "./screans/cadastrar-usuario-screan";

const AppNavigator = createStackNavigator({
  Ambientes: { screen: Ambientescreen },
  CreateUser: { screen: CreateUserScrean },
  Login: { screen: LoginScreen },
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;