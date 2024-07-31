import React, {useEffect, useState} from 'react';
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
import {fetchSupportTripList} from '../../api/trip/SupportTripListSlice';
import AppFonts from '../../constants/AppFonts';
import useBackHandler from '../../constants/useBackHandler';

export type SupportUserTripsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SupportUserTrips'
>;

export type SupportUserTripsRouteProps = RouteProp<
  RootStackParams,
  'SupportUserTrips'
>;
interface Props {}

const SupportUserTrips: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<SupportUserTripsNavigationProps>();
  const status = route.params.status;
  const userId = route.params.userId;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {supportTrip, loadingSupportTrip} = useSelector(
    (state: RootState) => state.SupportTripList,
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
        fetchSupportTripList({
          requestBody: request,
          uri: 'user-trip/status-wise',
        }),
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
      {loadingSupportTrip && <BackgroundLoader />}

      {!IsNetConnected && (
        <View flex center>
          <Text white text40>
            No Network Connection
          </Text>
        </View>
      )}

      <View marginV-10 />
      {supportTrip && (
        <SectionList
          sections={supportTrip?.data.map(section => ({
            title: section.level,
            data: section.trips,
          }))}
          renderItem={({item, index}) => (
            <ListItem item={item} index={index} navigation={navigation} />
          )}
          renderSectionHeader={({section}) => {
            const {title, data} = section;
            return (
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
            );
          }}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      )}
    </View>
  );
};
export default SupportUserTrips;
