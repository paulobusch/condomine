import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import firebase from '@firebase/app';

import rootReducer from './src/reducers';
import CondomineApp from './src/condomine-app';
import { name as appName } from './app.json';

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

const firebaseConfig = {
  apiKey: "AIzaSyDctCbgP2a9oWimIjWHkFHmWN6X5O0dttQ",
  authDomain: "condomine-102ee.firebaseapp.com",
  projectId: "condomine-102ee",
  storageBucket: "condomine-102ee.appspot.com",
  messagingSenderId: "236968077951",
  appId: "1:236968077951:web:94cebe581a8b7f8affed4a",
  measurementId: "G-7X7MTFZWFM"
};

firebase.initializeApp(firebaseConfig);

const store = applyMiddleware(reduxThunk)(createStore)(rootReducer);

export default function Main() {
  return (
    <StoreProvider store={ store }>
      <PaperProvider theme={ theme }>
        <CondomineApp />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);