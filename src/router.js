import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screans/login-screan';
import AmbienteScreen from './screans/ambientes-screan';
import ReservaScreen from './screans/reserva-screan';
import CreateUserScrean from "./screans/cadastrar-usuario-screan";
import AmbienteFormScrean from "./screans/ambiente-form-screan";
import ReservaFormScrean from "./screans/reserva-form-screan";

const AppNavigator = createStackNavigator({
  Reservas: { screen: ReservaScreen },
  ReservaForm: { screen: ReservaFormScrean },
  Ambientes: { screen: AmbienteScreen },
  AmbienteForm: { screen: AmbienteFormScrean },
  CreateUser: { screen: CreateUserScrean },
  Login: { screen: LoginScreen },
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;