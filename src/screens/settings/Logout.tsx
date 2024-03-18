import React, {useRef, useState, useEffect} from 'react';
import {Chip, Text, View} from 'react-native-ui-lib';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  PanResponder,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import ButtonView from '../../components/ButtonView';
import AppColors from '../../constants/AppColors';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../constants/commonUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import {RouteNames} from '../../navigation';
const deviceHeight = Dimensions.get('window').height;

const Logout = (props: {close: any; navigation: any}) => {
  const close = props.close;
  const navigation = props.navigation;

  useEffect(() => {
    openModal();
  }, []);

  const LoggingOut = async () => {
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    await AsyncStorage.removeItem(AppStrings.IS_LOGIN);
    await AsyncStorage.removeItem(AppStrings.TYPE);
    navigation.reset({
      index: 0,
      routes: [{name: RouteNames.LoginScreen}],
    });
  };

  const modalY = useRef(new Animated.Value(deviceHeight)).current;

  const openModal = () => {
    Animated.timing(modalY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalY, {
      toValue: 300,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      close();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          modalY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(modalY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.modal, {transform: [{translateY: modalY}]}]}
      {...panResponder.panHandlers}>
      <View padding-20 style={styles.divider}>
        <Text style={styles.alertTitle}>Logout</Text>
      </View>
      <View paddingH-20 paddingT-20>
        <Text style={styles.alert}>
          Are you sure you want logout from application?
        </Text>
      </View>

      <View row padding-20>
        <View flex>
          <ButtonView
            title="Cancel"
            onPress={() => closeModal()}
            black={true}
          />
        </View>
        <View marginH-10 />
        <View flex>
          <ButtonView title={'Logout'} onPress={LoggingOut} />
        </View>
      </View>
    </Animated.View>
  );
};

export default Logout;
