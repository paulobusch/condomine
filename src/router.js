import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screans/login';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Bem vindo'
    }
  }
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;