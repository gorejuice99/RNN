import React, { Component } from 'react';
import imagePlaceholder from '../../assets/beautifulPlace.jpg';
import { View, Image, Button, StyleSheet } from 'react-native';

class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeHolder}>
          <Image source={imagePlaceholder} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={() => alert('pick Image')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeHolder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },

  previewImage: {
    width: '100%',
    height: '100%'
  }
});

export default PickImage;
