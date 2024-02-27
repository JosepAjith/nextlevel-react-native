import React, {useState} from 'react';
import {
  Button,
  Checkbox,
  Chip,
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
import {
  Animated,
  Easing,
  FlatList,
  ImageBackground,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {Header} from '../../components/Header';
import { useDispatch } from 'react-redux';
import { styles } from '../mytrip/styles';

const {TextField} = Incubator;

export type UserListNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'UserList'
>;

export type UserListRouteProps = RouteProp<RootStackParams, 'UserList'>;

interface Props {}

const UserList: React.FC<Props> = () => {
  const navigation = useNavigation<UserListNavigationProps>();
  const dispatch = useDispatch();
  const [data, setData] = useState([
    {
      img: AppImages.HOME1,
      title: 'Mud & Glory Safari',
      data: '22-04-24',
      time: '06:00 AM',
      capacity: 4,
      position: 'newbie',
      status: 'Live',
      id: 1,
    },
    {
      img: AppImages.HOME2,
      title: 'Wilderness Roamer Rally',
      data: '22-04-24',
      time: '06:00 AM',
      capacity: 5,
      position: 'newbie',
      status: 'Live',
      id: 2,
    },
    {
      img: AppImages.HOME1,
      title: 'Rugged Horizon Quest',
      data: '22-04-24',
      time: '06:00 AM',
      capacity: 4,
      position: 'newbie',
      status: 'Live',
      id: 3,
    },
    {
      img: AppImages.HOME2,
      title: 'Offbeat Overland Voyage',
      data: '22-04-24',
      time: '06:00 AM',
      capacity: 5,
      position: 'newbie',
      status: 'Live',
      id: 4,
    },
  ]);



  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header leftIcon={false} title="My Trips" rightIcon={AppImages.REFRESH} />

      <View row centerV>
        <View flex>
          <TextField
            fieldStyle={[styles.field, {width: '100%'}]}
            placeholder={'Search'}
            placeholderTextColor={'#999999'}
            style={styles.text}
            paddingH-20
            marginT-25
            marginB-20
            leadingAccessory={
              <Image
                source={AppImages.SEARCH}
                width={20}
                height={20}
                marginR-10
              />
            }
          />
        </View>

        <View style={{flex: 0.3}} right>
          <TouchableOpacity onPress={()=>dispatch({type: 'IS_FILTER', payload: true})}>
          <Image source={AppImages.FILTER} width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>


      {/* <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
          );
        }}
      /> */}

      
    </View>
  );
};
export default UserList;
