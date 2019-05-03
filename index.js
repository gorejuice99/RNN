/**
 * @format
 */

import React from 'react';
import { Navigation } from 'react-native-navigation';
import App from './App';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent(
  'navigation.playground.AuthScreen',
  () => props => (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  ),
  () => App
);

Navigation.registerComponent(
  'navigation.playground.SharePlaceScreen',
  () => props => (
    <Provider store={store}>
      <SharePlaceScreen {...props} />
    </Provider>
  ),
  () => SharePlaceScreen
);

Navigation.registerComponent(
  'navigation.playground.FindPlaceScreen',
  () => props => (
    <Provider store={store}>
      <FindPlaceScreen {...props} />
    </Provider>
  ),
  () => FindPlaceScreen
);

Navigation.registerComponent(
  'navigation.playground.PlaceDetailScreen',
  () => props => (
    <Provider store={store}>
      <PlaceDetailScreen {...props} />
    </Provider>
  ),
  () => PlaceDetailScreen
);

Navigation.registerComponent(
  'navigation.playground.SideDrawerScreen',
  () => props => (
    <Provider store={store}>
      <SideDrawerScreen {...props} />
    </Provider>
  ),
  () => SideDrawerScreen
);

export default () => Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'navigation.playground.AuthScreen'
      }
    }
  });
});
