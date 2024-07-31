import React, {useEffect, useMemo, useState} from 'react';
import {Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {FlatList, SectionList} from 'react-native';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTripList} from '../../api/trip/TriplListSlice';
import BackgroundLoader from '../../components/BackgroundLoader';
import ListItem from '../../components/ListItem';
import {Header} from '../../components/Header';
import AppImages from '../../constants/AppImages';
import useBackHandler from '../../constants/useBackHandler';
import AppFonts from '../../constants/AppFonts';

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

  useBackHandler(() => {
    navigation.goBack(); // Navigate back to the previous screen
    return true; // Prevent default behavior
  });

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
      dispatch(
        fetchTripList({requestBody: request, uri: 'user-trip/status-wise'}),
      );
    }
  };

  const sections = useMemo(() => {
    if (!trip?.data) return [];
  
    // Create a map to group trips by level
    const levelMap = trip.data.reduce((acc, trip) => {
      if (!acc[trip.level]) {
        acc[trip.level] = [];
      }
      acc[trip.level].push(trip);
      return acc;
    }, {});
  
    // Transform map into array of sections
    return Object.keys(levelMap).map((level) => ({
      title: level,
      data: levelMap[level],
    }));
  }, [trip]);

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

      <SectionList
  sections={sections}
  keyExtractor={(item, index) => `${item.id}-${index}`}
  renderSectionHeader={({ section: { title, data } }) => (
    <View row style={{justifyContent: 'space-between'}} marginV-10>
                <Text white style={{fontSize: 16, fontFamily: AppFonts.REGULAR}}>
                  Trip Level
                </Text>
                <Text
                  white
                  style={{fontSize: 16, fontFamily: AppFonts.BOLD}}>
                  {title} ( {data.length} )
                </Text>
              </View>
  )}
  renderItem={({ item, index }) => (
    <ListItem item={item} index={index} navigation={navigation} />
  )}
  showsVerticalScrollIndicator={false}
/>
    </View>
  );
};
export default UserTrips;
