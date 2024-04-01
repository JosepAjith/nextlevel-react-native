import React, {useEffect, useState} from 'react';
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
import DropdownComponent from '../../components/DropdownComponent';
import {Dropdown} from 'react-native-element-dropdown';
import {reset, updateRole} from '../../api/levelUpdate/UpdateRoleSlice';
import {showToast} from '../../constants/commonUtils';
import BackgroundLoader from '../../components/BackgroundLoader';

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

const Level = [
  {type: 'First Join', id: 'First Join'},
  {type: 'newbie', id: 'newbie'},
  {type: 'newbie+', id: 'newbie+'},
  {type: 'Intermediate Exam', id: 'Intermediate Exam'},
  {type: 'Intermediate', id: 'Intermediate'},
  {type: 'Intermediate+', id: 'Intermediate+'},
  {type: 'Advance Exam', id: 'Advance Exam'},
  {type: 'Advanced', id: 'Advanced'},
];

const UserList: React.FC<Props> = () => {
  const navigation = useNavigation<UserListNavigationProps>();
  const [filter, setFilter] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [userList, setUserList] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const {users, loadingUsers, usersError} = useSelector(
    (state: RootState) => state.UserList,
  );
  const {updateRoleData, loadingRoleUpdate, roleUpdateError} = useSelector(
    (state: RootState) => state.UpdateRole,
  );
  const [search, setSearch] = useState('');
  const {filterValue} = useSelector((state: RootState) => state.TripReducer);
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch({type: 'SET_FILTER_VALUE', payload: ''});

      return () => {};
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      FetchList(1);

      return () => {
        setUserList([]);
      };
    }, [search, filterValue]),
  );

  const FetchList = (page: number) => {
    if (IsNetConnected) {
      let request = JSON.stringify({
        level: filterValue ? [filterValue] : User,
        page: page,
        title: search,
      });
      dispatch(fetchUserList({requestBody: request}))
        .then((response: any) => {
          if (page === 1) {
            setUserCount(response.payload.users.total_count);
            setUserList(response.payload.users.data);
          } else {
            // Concatenate the new trips with the existing list
            setUserList(prevList =>
              prevList.concat(response.payload.users.data),
            );
          }
        })
        .catch((error: any) => {
          // Handle error
        });
    }
  };

  const updatingRole = async (id: number, level: string) => {
    let request = {
      id: id,
      level: level,
    };
    dispatch(
      updateRole({
        requestBody: request,
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (updateRoleData != null) {
      if (!loadingRoleUpdate && !roleUpdateError && updateRoleData.status) {
        showToast(updateRoleData.message);
        FetchList(1);
      } else {
        showToast(updateRoleData.message);
      }
    }
  }, [updateRoleData]);

  const loadMoreTrips = () => {
    if (users?.total_page && users?.page < users?.total_page) {
      const nextPage = users.page + 1;
      FetchList(nextPage);
    }
  };

  return (
    <View flex backgroundColor={AppColors.Black}>
      <View flex padding-20>
        <Header
          title="User List"
          rightIcon={AppImages.REFRESH}
          rightOnpress={() => {
            setSearch('');
            dispatch({type: 'SET_FILTER_VALUE', payload: ''});
            setUserList([]);
            FetchList(1);
          }}
        />

        {loadingUsers && <BackgroundLoader />}

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
        <Text style={[styles.name,{bottom:10}]}>{'Total Users : ' + userCount}</Text>
        <FlatList
          data={userList}
          numColumns={2}
          renderItem={({item, index}) => {
            const isEvenIndex = index % 2 === 0;
            const alignmentStyle = isEvenIndex ? 'flex-start' : 'flex-end';
            return (
              <View style={{alignItems: alignmentStyle, flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch({type: 'SET_USER_ID', payload: item.id});
                    navigation.navigate(RouteNames.ProfileScreen);
                  }}>
                  <View style={[styles.marshalView, {width: itemWidth}]}>
                    <Image
                      source={
                        item.image ? {uri: item.image} : AppImages.PLACEHOLDER
                      }
                      style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 5,
                      }}
                    />
                  
                      <View center paddingT-10>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                        <Text style={styles.email}>{item.level}</Text>
                      </View>
                    
                      <View center>
                        <Dropdown
                          style={styles.role}
                          placeholderStyle={styles.roleText}
                          selectedTextStyle={styles.roleText}
                          inputSearchStyle={styles.roleText}
                          itemTextStyle={{fontSize: 12, color: 'black'}}
                          data={Level}
                          search
                          maxHeight={300}
                          labelField={'type'}
                          valueField={'id'}
                          placeholder="Update Role"
                          value={item.level}
                          searchPlaceholder="Search..."
                          onChange={items => {
                            updatingRole(item.id, items.type);
                          }}
                          renderRightIcon={() => (
                            <View row centerV>
                              <Text red10></Text>
                              <Image
                                source={AppImages.DOWN}
                                tintColor="#3F4E59"
                                width={11}
                                height={6}
                              />
                            </View>
                          )}
                        />
                      </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          onEndReached={loadMoreTrips}
        />
      </View>
      {filter && <TripFilter close={() => setFilter(false)} selected={filterValue}/>}
    </View>
  );
};
export default UserList;
