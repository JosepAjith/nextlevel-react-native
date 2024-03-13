import React, {useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';

export type SplashScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SplashScreen'
>;

export type SplashScreenRouteProps = RouteProp<RootStackParams, 'SplashScreen'>;

interface Props {}

const SplashScreen: React.FC<Props> = () => {
  const [count, setCount] = useState(0);
  const navigation = useNavigation<SplashScreenNavigationProps>();


  setTimeout(async () => {

    if ((await AsyncStorage.getItem(AppStrings.IS_ONBOARD)) == null) {
      navigation.replace(RouteNames.OnboardScreen);
    } else if ((await AsyncStorage.getItem(AppStrings.IS_LOGIN)) == null) {
      navigation.replace(RouteNames.LoginScreen);
    }
    else {
      navigation.replace(RouteNames.BottomTabs)
    }
  }, 2000);

  return (
    <View flex center backgroundColor={AppColors.Black}>

        <Image source={AppImages.NXTLEVEL}/>
   

    </View>
  );
};
export default SplashScreen;
