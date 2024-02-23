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

const {TextField} = Incubator;

export type ChangePasswordScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ChangePasswordScreen'
>;

export type ChangePasswordScreenRouteProps = RouteProp<
  RootStackParams,
  'ChangePasswordScreen'
>;

interface Props {}

const ChangePasswordScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ChangePasswordScreenNavigationProps>();

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="Change Password" />

      <TextField
        fieldStyle={styles.field}
        label={'New Password'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginT-40
        trailingAccessory={<Image source={AppImages.EYE} />}
      />

      <View marginT-10>
        <Text style={styles.text1}>
          Create a new password. Ensure it differs from previous ones for
          security
        </Text>
      </View>

      <TextField
        fieldStyle={styles.field}
        label={'Re-enter Password'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginT-25
        marginB-40
        trailingAccessory={<Image source={AppImages.EYE} />}
      />

      <ButtonView title="Change Password" onPress={() => {navigation.navigate(RouteNames.SuccessScreen)}} />
    </View>
  );
};
export default ChangePasswordScreen;
