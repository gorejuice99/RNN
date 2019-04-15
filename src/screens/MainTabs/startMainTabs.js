import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const starTabs = () => {
  Promise.all([
    Icon.getImageSource('md-locate', 30),
    Icon.getImageSource('md-share-alt', 30),
    Icon.getImageSource('md-menu', 30)
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
