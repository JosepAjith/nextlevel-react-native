import React, {useState} from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';

const {TextField} = Incubator;

export type AddTripScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AddTripScreen'
>;

export type AddTripScreenRouteProps = RouteProp<
  RootStackParams,
  'AddTripScreen'
>;

interface Props {}

const AddTripScreen: React.FC<Props> = () => {
  const navigation = useNavigation<AddTripScreenNavigationProps>();

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>

    </View>
  );
};
export default AddTripScreen;
