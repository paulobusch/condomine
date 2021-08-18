import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import CondomineApp from './src/condomine-app';

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

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <CondomineApp />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);