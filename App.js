import React from 'react';
import { Provider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import App from './components/';
import { theme } from './core/theme';
import store from './store';

const Main = () => (
  <StoreProvider store={store}>
    <Provider theme={theme}>
      <App />
    </Provider>
  </StoreProvider>
);

export default Main;