import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import startMainTabs from './src/screens/MainTabs/startMainTabs';
import DefaultInput from './src/components/UI/DefaultInput/DefaultInput';
import HeadingText from './src/components/UI/HeadingText/HeadingText';
import MainText from './src/components/UI/MainText/MainText';
import ButtonWithBackground from './src/components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from './src/assets/background.jpg';

class App extends Component {
  state = {
    respStyles: {
      pwContainerDirection: 'column',
      pwContainerJustifyContent: 'flex-start',
      pwWrapperWidth: '100%'
    }
  };
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', dims => {
      this.setState({
        respStyles: {
          pwContainerDirection:
            Dimensions.get('window').height > 500 ? 'column' : 'row',
          pwContainerJustifyContent:
            Dimensions.get('window').height > 500
              ? 'flex-start'
              : 'space-between',
          pwWrapperWidth: Dimensions.get('window').height > 500 ? '100%' : '45%'
        }
      });
    });
  }
  loginHandler = () => {
    console.log('oh here we go boy');
    startMainTabs();
  };

  render() {
    let headingText = null;
    if (Dimensions.get('window').height > 500) {
      headingText = (
        <MainText>
          <HeadingText>Please Login</HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={() => alert('hello')}>
            Switch to login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
            />
            <View
              style={{
                flexDirection: this.state.respStyles.pwContainerDirection,
                justifyContent: this.state.respStyles.pwContainerJustifyContent
              }}
            >
              <View
                style={{
                  width: this.state.respStyles.pwWrapperWidth
                }}
              >
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
              <View
                style={{
                  width: this.state.respStyles.pwWrapperWidth
                }}
              >
                <DefaultInput
                  placeholder="Confirm Password"
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          <ButtonWithBackground onPress={this.loginHandler} color="#29aaf4">
            Submit
          </ButtonWithBackground>
          {/* <Button title="Submit" onPress={this.loginHandler} /> */}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  }
});

export default App;
