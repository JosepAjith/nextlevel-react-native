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
import {RouteProp, useFocusEffect} from '@react-navigation/native';
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
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../mytrip/styles';
import TripFilter from '../mytrip/TripFilter';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {fetchUserList} from '../../api/user/UserListSlice';

const {TextField} = Incubator;

export type UserListNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'UserList'
>;

export type UserListRouteProps = RouteProp<RootStackParams, 'UserList'>;

interface Props {}
const User = [
  'First Join',
  'newbie',
  'newbie+',
  'Intermediate Exam',
  'Intermediate Exam',
  'Intermediate+',
  'Advance Exam',
  'Advanced',
  'Explorer',
];

const UserList: React.FC<Props> = () => {
  const navigation = useNavigation<UserListNavigationProps>();
  const [filter, setFilter] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {users, loadingUsers, usersError} = useSelector(
    (state: RootState) => state.UserList,
  );
  const [search, setSearch] = useState('');
  const {filterValue} = useSelector((state: RootState) => state.TripReducer);
  console.log(filterValue, 'users');

  useFocusEffect(
    React.useCallback(() => {
      dispatch({type: 'SET_FILTER_VALUE', payload: ''});

      return () => {};
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      let request = JSON.stringify({
        level: filterValue ? [filterValue] : User,
      });
      dispatch(fetchUserList({requestBody: request}));

      return () => {};
    }, [filterValue]),
  );



  const SearchedUsers = users.filter(
    item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.level.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View flex backgroundColor={AppColors.Black}>
      <View padding-20>
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
              value={search}
              onChangeText={text => setSearch(text)}
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
          data={SearchedUsers}
          numColumns={2}
          renderItem={({item, index}) => {
            const isEvenIndex = index % 2 === 0;
            const alignmentStyle = isEvenIndex ? 'flex-start' : 'flex-end';
            return (
              <View style={{alignItems: alignmentStyle, flex: 1}}>
                <View center style={[styles.marshalView, {width: itemWidth}]}>
                  <Image
                    source={item.image ? {uri: item.image} : AppImages.USER1}
                    style={{
                      width: '100%',
                      height: 100,
                      borderRadius: 5,
                    }}
                  />
                  <View paddingV-10 center>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.email}>{item.level}</Text>

                    <View style={styles.role}>
                      <Text style={styles.roleText}>Update Role</Text>
                      <Image source={AppImages.DOWN} marginL-10 />
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      {filter && <TripFilter close={() => setFilter(false)} />}
    </View>
  );
};
export default UserList;
