import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AppImages from '../constants/AppImages';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={AppImages.LOADER}
        style={styles.loader}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 100,
    height: 100,
  },
});

export default Loader;
