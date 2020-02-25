import React from 'react';
import { Provider } from 'react-native-paper';
import App from './components/';
import { theme } from './core/theme';

const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;