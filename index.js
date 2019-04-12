/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import App from './App';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent(
  `navigation.playground.AuthScreen`,
  () => App,
  store,
  Provider
);

Navigation.registerComponent(
  `navigation.playground.SharePlaceScreen`,
  () => SharePlaceScreen,
  store,
  Provider
);
Navigation.registerComponent(
  `navigation.playground.FindPlaceScreen`,
  () => FindPlaceScreen,
  store,
  Provider
);

Navigation.registerComponent(
  'navigation.playground.PlaceDetailScreen',
  () => PlaceDetailScreen,
  store,
  Provider
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'navigation.playground.AuthScreen'
      }
    }
  });
});
