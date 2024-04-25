import React, {useEffect, useState} from 'react';
import {Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {FlatList} from 'react-native';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTripList} from '../../api/trip/TriplListSlice';
import BackgroundLoader from '../../components/BackgroundLoader';
import ListItem from '../../components/ListItem';
import {Header} from '../../components/Header';
import AppImages from '../../constants/AppImages';

export type UserTripsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'UserTrips'
>;

export type UserTripsRouteProps = RouteProp<RootStackParams, 'UserTrips'>;
interface Props {}

const UserTrips: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<UserTripsNavigationProps>();
  const status = route.params.status;
  const userId = route.params.userId;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {trip, loadingTrip, tripError} = useSelector(
    (state: RootState) => state.TripList,
  );
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchList();

      return () => {};
    }, []),
  );

  const fetchList = () => {
    if (IsNetConnected) {
      let request;
      if (userId) {
        request = JSON.stringify({
          status: status,
          id: userId,
        });
      } else {
        request = JSON.stringify({
          status: status,
        });
      }
      console.log(request)
      dispatch(
        fetchTripList({requestBody: request, uri: 'user-trip/status-wise'}),
      );
    }
  };

  return (
    <View flex backgroundColor={AppColors.Black} padding-20 paddingB-0>
      <Header
        title={status + ' Trips'}
        rightIcon={AppImages.REFRESH}
        rightOnpress={() => {
          fetchList();
        }}
      />
      {loadingTrip && <BackgroundLoader />}

      {!IsNetConnected && (
        <View flex center>
          <Text white text40>
            No Network Connection
          </Text>
        </View>
      )}

      <View marginV-10 />

      <FlatList
        data={trip?.data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return <ListItem item={item} index={index} navigation={navigation} />;
        }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  );
};
export default UserTrips;
