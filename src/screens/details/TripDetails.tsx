import React, {useEffect, useState} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import CarouselView from '../../components/CarousalView';
import Attendance from './Attendance';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchTripDetails} from '../../api/trip/TripDetailsSlice';
import {
  formattedTime,
  getDateTime,
  getUserDate,
  getUserTime,
  showToast,
} from '../../constants/commonUtils';
import moment from 'moment';
import {cancelTrip, reset} from '../../api/joinTrip/TripCancelSlice';
import BackgroundLoader from '../../components/BackgroundLoader';
import ButtonView from '../../components/ButtonView';
import {deleteReset, deleteTrip} from '../../api/trip/TripDeleteSlice';

const {TextField} = Incubator;

export type TripDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'TripDetails'
>;

export type TripDetailsRouteProps = RouteProp<RootStackParams, 'TripDetails'>;

interface Props {}

const TripDetails: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<TripDetailsNavigationProps>();
  const id = route.params.id;
  const {type, loginUserId} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {tripDetails, loadingTripDetails, tripDetailsError} = useSelector(
    (state: RootState) => state.TripDetails,
  );
  const {cancelData, loadingCancel, cancelError} = useSelector(
    (state: RootState) => state.TripCancel,
  );
console.log(tripDetails)
  useFocusEffect(
    React.useCallback(() => {
      fetchDetails();
      // Clean-up function
      return () => {};
    }, [cancelData]),
  );

  const fetchDetails = () => {
    let request = JSON.stringify({
      id: id,
    });
    dispatch(fetchTripDetails({requestBody: request}));
  };

  const cancelingTrip = async (book_id: number) => {
    let request = {
      trip_booking_id: book_id,
    };
    dispatch(
      cancelTrip({
        requestBody: request,
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (cancelData != null) {
      if (!loadingCancel && !cancelError && cancelData.status) {
        showToast(cancelData.message);
      } else {
        showToast(cancelData.message);
      }
    }
  }, [cancelData]);

  const renderDetails = (label: string, value: string) => (
    <View row marginB-10>
      <Text style={styles.rightText}>{label}</Text>
      <Text style={styles.leftText}>{value}</Text>
    </View>
  );

  return (
    <View flex backgroundColor={AppColors.Black}>
      <View padding-20>
        <Header
          title="Trip Details"
          rightIcon={AppImages.REFRESH}
          rightOnpress={fetchDetails}
        />
      </View>

      {(loadingTripDetails || loadingCancel) && <BackgroundLoader />}
      {tripDetails?.status && (
        <View flex>
          <CarouselView images={tripDetails.data.trip_images} />

          <ScrollView>
            <View flex padding-20>
              <View row centerV>
                <View flex row centerV>
                  <Text style={styles.title}>{tripDetails.data.title}</Text>
                  <View style={styles.statusView}>
                    <Text style={styles.statusText}>
                      {tripDetails.data.trip_status}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(RouteNames.TripMembers, {
                      id: tripDetails.data.id,
                      userId: tripDetails.data.user.id,
                      status: tripDetails.data.trip_status,
                    })
                  }
                  style={{
                    backgroundColor: '#F99933',
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Image source={AppImages.GROUP} height={9} width={14} />
                </TouchableOpacity>
              </View>

              <View row centerV marginV-10>
                <View flex row centerV>
                  <Text style={styles.text1}>Capacity</Text>
                  <View style={styles.capView}>
                    <Text style={styles.capty}>
                      {tripDetails.data.trip_book_joined_count}/
                      {tripDetails.data.capacity}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.text1}>{tripDetails.data.level}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.descrip}>
                  {tripDetails.data.description}
                </Text>
              </View>

              <View marginV-20>
                {renderDetails('Organized By', tripDetails.data.user.name)}
                {renderDetails('Trip Date', getUserDate(tripDetails.data.date))}
                {renderDetails(
                  'Post Date',
                  getUserDate(tripDetails.data.created_at),
                )}
                {renderDetails(
                  'Meeting Time',
                  formattedTime(tripDetails.data.meeting_time),
                )}
                {renderDetails(
                  'Start Time',
                  formattedTime(tripDetails.data.start_time),
                )}
                {renderDetails(
                  'Finish Time',
                  formattedTime(tripDetails.data.finish_time),
                )}
                <View row marginB-10>
                  <Text style={styles.rightText}>Starting Point</Text>
                  <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() =>
                      navigation.navigate(RouteNames.MapScreen, {
                        type: 'details',
                      })
                    }>
                    <Text style={[styles.leftText, {color: 'red'}]}>
                      {tripDetails.data.details_place}
                    </Text>
                  </TouchableOpacity>
                </View>
                {renderDetails('City', tripDetails.data.city)}
                {renderDetails('Area', tripDetails.data.area_details)}
                {renderDetails(
                  'Joining start',
                  getDateTime(tripDetails.data.joining_start_date),
                )}
                {renderDetails(
                  'Joining deadline',
                  getDateTime(tripDetails.data.joining_deadline),
                )}
              </View>

              {(tripDetails.data.trip_book
                ? tripDetails.data.trip_book.application_status != 'kick-off' &&
                  moment(new Date()).isBetween(
                    moment(tripDetails.data.joining_start_date),
                    moment(tripDetails.data.joining_deadline),
                  )
                : moment(new Date()).isBetween(
                    moment(tripDetails.data.joining_start_date),
                    moment(tripDetails.data.joining_deadline),
                  )) &&
                tripDetails.data.trip_status != 'expired' &&
                tripDetails.data.trip_status != 'completed' &&
                tripDetails.data.trip_status != 'cancelled' && (
                  <View row marginB-20>
                    {tripDetails.data.trip_book &&
                    (tripDetails.data.trip_book.application_status ===
                      'support' ||
                      tripDetails.data.trip_book.application_status ===
                        'joined' ||
                      tripDetails.data.trip_book.application_status ===
                        'waiting list') ? (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(RouteNames.JoinTrip, {
                              id: tripDetails.data.trip_book.id,
                              status:
                                tripDetails.data.trip_book.application_status,
                              type: 'edit',
                            })
                          }>
                          <View style={styles.yellowButton}>
                            <Text style={styles.text2}>Edit Ride</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            cancelingTrip(tripDetails.data.trip_book.id)
                          }>
                          <View style={styles.whiteButton}>
                            <Text style={[styles.text2, {color: 'black'}]}>
                              Sign out
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    ) : tripDetails.data.trip_book &&
                      tripDetails.data.trip_book.application_status ===
                        'may be' ? (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(RouteNames.JoinTrip, {
                              id: tripDetails.data.trip_book.id,
                              status:
                                tripDetails.data.trip_book.application_status,
                              type: 'edit',
                            })
                          }>
                          <View style={styles.yellowButton}>
                            <Text style={styles.text2}>Edit</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            cancelingTrip(tripDetails.data.trip_book.id)
                          }>
                          <View style={styles.whiteButton}>
                            <Text style={[styles.text2, {color: 'black'}]}>
                              Not Interested
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(RouteNames.JoinTrip, {
                              id: tripDetails.data.id,
                              status:
                                tripDetails.data.level === 'Get To Gether'
                                  ? ''
                                  : type === tripDetails.data.level
                                  ? ''
                                  : 'support',
                              type: 'join',
                            })
                          }>
                          <View style={styles.yellowButton}>
                            <Text style={styles.text2}>
                              {tripDetails.data.level === 'Get To Gether'
                                ? 'Sign in'
                                : type === tripDetails.data.level
                                ? 'Sign in'
                                : 'Support Sign in'}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(RouteNames.JoinTrip, {
                              id: tripDetails.data.id,
                              status: 'may be',
                              type: 'join',
                            })
                          }>
                          <View style={styles.whiteButton}>
                            <Text style={[styles.text2, {color: 'black'}]}>
                              Maybe
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                )}

              <Attendance
                startDate={tripDetails.data.joining_start_date}
                deadline={tripDetails.data.joining_deadline}
                userId={tripDetails?.data.user.id}
                TripId={tripDetails.data.id}
                TripStatus={tripDetails.data.trip_status}
                navigation={navigation}
                tripStartTime={
                  tripDetails.data.date + ' ' + tripDetails.data.start_time
                }
                tripEndTime={
                  tripDetails.data.date + ' ' + tripDetails.data.finish_time
                }
                application_status={
                  tripDetails.data.trip_book &&
                  tripDetails.data.trip_book.application_status
                }
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default TripDetails;
