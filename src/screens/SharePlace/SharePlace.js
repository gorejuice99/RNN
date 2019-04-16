import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { addPlace } from '../../store/actions';
import { Navigation } from 'react-native-navigation';

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
class SharePlaceScreen extends Component {
  state = {
    placeName: ''
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    console.log(this.props.componentId);
    // will be called when "buttonOne" is clicked
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        visible: true,
        title: {
          text: 'Title'
        }
      }
    });
  }

  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== '') {
      this.props.onAddPlace(this.state.placeName);
    }
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <Button title="Share the place!" onPress={this.placeAddedHandler} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(addPlace(placeName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
