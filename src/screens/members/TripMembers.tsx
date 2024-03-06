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
import {styles} from '../mytrip/styles';
import TripFilter from '../mytrip/TripFilter';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { fetchMemberList } from '../../api/member/MemberListSlice';

const {TextField} = Incubator;

export type TripMembersNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'TripMembers'
>;

export type TripMembersRouteProps = RouteProp<RootStackParams, 'TripMembers'>;

interface Props {}

const TripMembers: React.FC<Props> = () => {
  const navigation = useNavigation<TripMembersNavigationProps>();
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {members, loadingMembers, membersError} = useSelector(
    (state: RootState) => state.MemberList,
  );

  useFocusEffect(
    React.useCallback(() => {
      let request = JSON.stringify({
        trip_id:5,
        application_status:"",
      });
      dispatch(fetchMemberList({requestBody: request}));

      return () => {};
    }, []),
  );
  

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="Trip Members" rightIcon={AppImages.REFRESH} />

      {/* <FlatList
        data={members}
        numColumns={2}
        contentContainerStyle={{marginTop:20}}
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
                  <Text style={[styles.name,{fontSize:10}]} marginV-5>{item.car}</Text>
                  <Text style={styles.email}>Contact Info : {item.contact}</Text>

                  <View style={styles.role}>
                    <Text style={styles.roleText}>View Ride</Text>
                    </View>
                </View>
              </View>
            </View>
          );
        }}
      /> */}
    </View>
  );
};
export default TripMembers;
