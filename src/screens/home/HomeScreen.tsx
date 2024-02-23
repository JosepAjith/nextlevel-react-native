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

export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

export type HomeScreenRouteProps = RouteProp<
  RootStackParams,
  'HomeScreen'
>;

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>

      <View row>
        <View flex>
        <Text style={styles.title}>Buckle up and get ready</Text>
        </View>

        <View center style={styles.notifView}>
          <Image source={AppImages.NOTIF} width={18} height={21}/>
          {/* <View style={{position:'absolute', right:13, top:12 }}>
          <Image source={AppImages.DOT} width={8} height={8}/>
          </View> */}
        </View>
      </View>

    </View>
  );
};
export default HomeScreen;
