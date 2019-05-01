import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import DefaultInput from './src/components/UI/DefaultInput/DefaultInput';
import HeadingText from './src/components/UI/HeadingText/HeadingText';
import MainText from './src/components/UI/MainText/MainText';
import ButtonWithBackground from './src/components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from './src/assets/background.jpg';
import validate from './src/utility/validation';
import { connect } from 'react-redux';
import { tryAuth, authAutoSignIn } from './src/store/actions';
class App extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  componentDidMount() {
    this.props.onAutoSignIn();
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onTryAuth(authData, this.state.authMode);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      let equalControl = this.state.controls[key].validationRules.equalTo;
      let equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    let headingText = null;
    let confirmPasswordControl = null;
    let submitButton = (
      <ButtonWithBackground
        disabled={
          (!this.state.controls.confirmPassword.valid &&
            this.state.authMode === 'signup') ||
          !this.state.controls.password.valid ||
          !this.state.controls.email.valid
        }
        onPress={this.authHandler}
        color="#29aaf4"
      >
        Submit
      </ButtonWithBackground>
    );

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Login</HeadingText>
        </MainText>
      );
    }

    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === 'portrait'
              ? styles.portraitPasswordwrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInputState('confirmPassword', val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to
            {this.state.authMode === 'login' ? ' Sign Up' : ' Login'}
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState('email', val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <View
              style={
                this.state.viewMode === 'portrait' ||
                this.state.authMode === 'login'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === 'portrait' ||
                  this.state.authMode === 'login'
                    ? styles.portraitPasswordwrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState('password', val)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  secureTextEntry
                />
              </View>
              {confirmPasswordControl}
            </View>
          </View>
          {submitButton}
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
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordwrapper: {
    width: '100%'
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
