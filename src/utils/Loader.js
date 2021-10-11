import React, {Component} from 'react';
import {View, Modal, ActivityIndicator, Image, Text} from 'react-native';
import styles, {ThemeColors} from '../styles/main.style';

const Loader = props => {
  const {loading} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#00000040',
        }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 100,
            width: 100,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <ActivityIndicator
            color={ThemeColors.secondaryColor}
            animating={loading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
