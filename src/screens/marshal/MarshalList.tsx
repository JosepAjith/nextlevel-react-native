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
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../mytrip/styles';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { fetchUserList } from '../../api/user/UserListSlice';

const {TextField} = Incubator;

export type MarshalListNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MarshalList'
>;

export type MarshalListRouteProps = RouteProp<RootStackParams, 'MarshalList'>;

interface Props {}

const Marshals =  ['Marshal','Super Marshal','Get To Gether']

const MarshalList: React.FC<Props> = () => {
  const navigation = useNavigation<MarshalListNavigationProps>();
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {users, loadingUsers, usersError} = useSelector(
    (state: RootState) => state.UserList,
  );
  const [search, setSearch] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      let request = JSON.stringify({
        level: Marshals,
      });
      dispatch(fetchUserList({requestBody: request}));

      return () => {
        
      };
    }, []),
  );

  const SearchedMarshal = users.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.email.toLowerCase().includes(search.toLowerCase()) ||
  item.level.toLowerCase().includes(search.toLowerCase())
);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="Marshals" rightIcon={AppImages.REFRESH} />

      <TextField
        fieldStyle={[styles.field, {width: '100%'}]}
        placeholder={'Search'}
        placeholderTextColor={'#999999'}
        style={styles.text}
        paddingH-20
        marginT-25
        marginB-20
        value={search}
        onChangeText={(text)=> setSearch(text)}
        leadingAccessory={
          <Image source={AppImages.SEARCH} width={20} height={20} marginR-10 />
        }
      />

      <FlatList
        data={SearchedMarshal}
        numColumns={2}
        renderItem={({item, index}) => {
          const isEvenIndex = index % 2 === 0;
          const alignmentStyle = isEvenIndex ? 'flex-start' : 'flex-end';
      
          return (
            <View style={{alignItems: alignmentStyle, flex: 1}}>
              <TouchableOpacity onPress={()=>{dispatch({ type: 'SET_USER_ID', payload: item.id }) 
              navigation.navigate(RouteNames.ProfileScreen)}}>
              <View center style={[styles.marshalView, {width: itemWidth}]}>
                <Image
                  source={item.image?{uri:item.image}:AppImages.USER1}
                  style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 5
                  }}
                />
                <View paddingV-10 center>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <View row center>
                  <Text style={styles.email}>{item.level}</Text>
                  <View row marginL-5>
                    <Image source={AppImages.STAR} width={10} height={10} />
                    <Image source={AppImages.STAR} width={10} height={10} marginH-5/>
                    <Image source={AppImages.STAR} width={10} height={10} />
                  </View>
                </View>
                </View>
              </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
export default MarshalList;
