import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { addPlace } from '../../store/actions';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { Navigation } from 'react-native-navigation';

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    console.log(buttonId);
    // will be called when "buttonOne" is clicked
    Navigation.mergeOptions('navigation.playground.SideDrawerScreen', {
      sideMenu: {
        visible: true,
        title: {
          text: 'Title'
        }
      }
    });
  }

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };

  render() {
    return (
      <View>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(addPlace(placeName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
