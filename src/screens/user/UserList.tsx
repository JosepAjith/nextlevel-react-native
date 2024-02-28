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
  Dimensions,
  Easing,
  FlatList,
  ImageBackground,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {Header} from '../../components/Header';
import {useDispatch} from 'react-redux';
import {styles} from '../mytrip/styles';
import TripFilter from '../mytrip/TripFilter';

const {TextField} = Incubator;

export type UserListNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'UserList'
>;

export type UserListRouteProps = RouteProp<RootStackParams, 'UserList'>;

interface Props {}

const UserList: React.FC<Props> = () => {
  const navigation = useNavigation<UserListNavigationProps>();
  const [filter, setFilter] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const [data, setData] = useState([
    {
      img: AppImages.USER1,
      name: 'Mud Maverick',
      email: 'maverick.44x@gmail.com',
      role: 'Newbie',
      id: 1,
    },
    {
      img: AppImages.USER2,
      name: 'Mud Maverick',
      email: 'maverick.44x@gmail.com',
      role: 'Intermediate',
      id: 2,
    },
    {
      img: AppImages.USER1,
      name: 'Mud Maverick',
      email: 'maverick.44x@gmail.com',
      role: 'Intermediate+',
      id: 3,
    },
    {
      img: AppImages.USER2,
      name: 'Mud Maverick',
      email: 'maverick.44x@gmail.com',
      role: 'First join',
      id: 4,
    },
  ]);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="User List" rightIcon={AppImages.REFRESH} />

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
          <TouchableOpacity onPress={() => setFilter(!filter)}>
            <Image source={AppImages.FILTER} width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item, index}) => {
          const isEvenIndex = index % 2 === 0;
          const alignmentStyle = isEvenIndex ? 'flex-start' : 'flex-end';
          return (
            <View style={{alignItems: alignmentStyle, flex: 1}}>
              <View center style={[styles.marshalView, {width: itemWidth}]}>
                <Image
                  source={item.img}
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 5,
                  }}
                />
                <View paddingV-10 center>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                  <Text style={styles.email}>{item.role}</Text>

                  <View style={styles.role}>
                    <Text style={styles.roleText}>Update Role</Text>
                    <Image source={AppImages.DOWN} marginL-10/>
                    </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View flex>
        {filter && <TripFilter close={() => setFilter(false)} />}
      </View>
    </View>
  );
};
export default UserList;
