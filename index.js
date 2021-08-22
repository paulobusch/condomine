import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, ThemeProvider } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Provider as StoreProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './src/reducers';
import CondomineApp from './src/condomine-app';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#B100E5',
    primary: '#5d0078',
    accent: '#00b9ff'
  },
  fonts: {
    small: 10,
    medium: 16,
    big: 30
  }
};

const store = applyMiddleware(reduxThunk)(createStore)(rootReducer);

export default function Main() {
  return (
    <StoreProvider store={ store }>
      <PaperProvider
        settings={ { icon: props => <AwesomeIcon {...props} style={ { opacity: .5 } }/> } } 
        theme={ theme }
      >
        <ThemeProvider theme={ theme }>
          <CondomineApp />
        </ThemeProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);