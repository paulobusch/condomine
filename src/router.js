import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screans/login-screan';
import AmbienceScreen from './screans/ambience-screan';

const AppNavigator = createStackNavigator({
  Ambiences: { screen: AmbienceScreen },
  Login: { screen: LoginScreen }
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;