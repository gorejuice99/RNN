import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
const starTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-share-alt' : 'ios-share-alt',
      30
    ),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
  ]).then(sources => {
    console.log(sources);
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: 'navigation.playground.SideDrawerScreen',
              passProps: {
                text: 'This is a left side menu screen'
              }
            }
          },
          center: {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'navigation.playground.SharePlaceScreen',
                          passProps: {}
                        }
                      }
                    ],
                    options: {
                      topBar: {
                        title: {
                          text: 'Share Place'
                        },
                        leftButtons: [
                          {
                            id: 'sideDrawerToggle',
                            icon: sources[2]
                          }
                        ]
                      },
                      bottomTab: {
                        testID: 'navigation.SharePlace',
                        text: 'Share Place',
                        icon: sources[0]
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'navigation.playground.FindPlaceScreen',
                          passProps: {}
                        }
                      }
                    ],
                    options: {
                      topBar: {
                        title: {
                          text: 'Find Place'
                        },
                        leftButtons: [
                          {
                            id: 'sideDrawerToggle',
                            icon: sources[2]
                          }
                        ]
                      },
                      bottomTab: {
                        testID: 'navigation.FindPlace',
                        text: 'Find Place',
                        icon: sources[1]
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    });
  });
};

export default starTabs;
