import React from 'react';
import { View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';
import AppImages from '../constants/AppImages';

interface Props {
}

const BackgroundLoader: React.FC<Props> = ({}) => {
  return (
    <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
          >
            <View flex center>
              <Lottie
                source={AppImages.LOADER}
                autoPlay
                loop={true}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>
  )
};

export default BackgroundLoader;
