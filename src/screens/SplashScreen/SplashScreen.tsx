import React, {useEffect, useState} from 'react';
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

  useEffect(() => {
    const initialize = async () => {
      const deepLinkId = await AsyncStorage.getItem(AppStrings.DEEP_LINK_ID);
      const isOnboarded = await AsyncStorage.getItem(AppStrings.IS_ONBOARD);
      const isLoggedIn = await AsyncStorage.getItem(AppStrings.IS_LOGIN);

      if (!isOnboarded) {
        navigation.replace(RouteNames.OnboardScreen);
      } else if (!isLoggedIn) {
        navigation.replace(RouteNames.LoginScreen);
      } else {
        if (deepLinkId) {
          navigation.replace(RouteNames.JoinTrip, {
            id: Number(deepLinkId),
            status:'',
            type: 'join',
            isDeepLink: true
          })
          await AsyncStorage.removeItem(AppStrings.DEEP_LINK_ID);
        } else {
          navigation.replace(RouteNames.BottomTabs);
        }
      }
    };

    const timer = setTimeout(initialize, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View flex center backgroundColor={AppColors.Black}>
      <Image source={AppImages.NXTLEVEL} />
    </View>
  );
};
export default SplashScreen;
