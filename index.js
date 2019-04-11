/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import App from './App';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';

Navigation.registerComponent(`navigation.playground.AuthScreen`, () => App);
Navigation.registerComponent(
  `navigation.playground.SharePlaceScreen`,
  () => SharePlaceScreen
);
Navigation.registerComponent(
  `navigation.playground.FindPlaceScreen`,
  () => FindPlaceScreen
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
