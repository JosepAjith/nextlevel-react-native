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
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';

const {TextField} = Incubator;

export type SuccessScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SuccessScreen'
>;

export type SuccessScreenRouteProps = RouteProp<
  RootStackParams,
  'SuccessScreen'
>;

interface Props {}

const SuccessScreen: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<SuccessScreenNavigationProps>();
  const from = route.params.from;

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="Success" />

      <View center marginT-50 marginB-30>
        <Image source={AppImages.SUCCESS} width={95} height={95}/>
      </View>

      <View marginB-50 center>
        <Text
          style={{
            fontFamily: AppFonts.REGULAR,
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
            lineHeight: 24,
            width: '70%',
          }}>
          Your password has been successfully {from == 'change' ? 'Changed' : 'Reset'} !
        </Text>
      </View>

      <ButtonView title="Login" onPress={() => {navigation.navigate(RouteNames.LoginScreen)}} />
    </View>
  );
};
export default SuccessScreen;
