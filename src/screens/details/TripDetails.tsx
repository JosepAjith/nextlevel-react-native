import React, {useEffect, useState} from 'react';
import {Image, Incubator, Text, View} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
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
} from '../../constants/commonUtils';
import moment from 'moment';

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
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {tripDetails, loadingTripDetails, tripDetailsError} = useSelector(
    (state: RootState) => state.TripDetails,
  );

  useEffect(() => {
    let request = JSON.stringify({
      id: id,
    });
    dispatch(fetchTripDetails({requestBody: request}));
  }, []);

  return (
    <View flex backgroundColor={AppColors.Black}>
      <View padding-20>
        <Header title="Trip Details" rightIcon={AppImages.REFRESH} />
      </View>
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
                      {tripDetails.data.trip_status == 'active' && 'Live'}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate(RouteNames.TripMembers)}
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
                      {tripDetails.data.passenger}/{tripDetails.data.capacity}
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
                <View row marginB-10>
                  <Text style={styles.rightText}>Organized By</Text>
                  <Text style={styles.leftText}>
                    {tripDetails.data.user.name}
                  </Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>Trip Date</Text>
                  <Text style={styles.leftText}>
                    {getUserDate(tripDetails.data.date)}
                  </Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>Post Date</Text>
                  <Text style={styles.leftText}>
                    {getUserDate(tripDetails.data.created_at)}
                  </Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>Meeting Time</Text>
                  <Text style={styles.leftText}>
                    {formattedTime(tripDetails.data.start_time)}
                  </Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>Start Time</Text>
                  <Text style={styles.leftText}>
                    {formattedTime(tripDetails.data.start_time)}
                  </Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>Finish Time</Text>
                  <Text style={styles.leftText}>
                    {formattedTime(tripDetails.data.finish_time)}
                  </Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>City</Text>
                  <Text style={styles.leftText}>{tripDetails.data.city}</Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>Area</Text>
                  <Text style={styles.leftText}>
                    {tripDetails.data.area_details}
                  </Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>Joining start</Text>
                  <Text style={styles.leftText}>
                    {getDateTime(tripDetails.data.joining_start_date)}
                  </Text>
                </View>

                <View row marginB-10>
                  <Text style={styles.rightText}>Joining deadline</Text>
                  <Text style={styles.leftText}>
                    {getDateTime(tripDetails.data.joining_deadline)}
                  </Text>
                </View>
              </View>

              {moment(new Date(), 'DD-MM-YYYY h:mm A').isBefore(
                moment(tripDetails.data.joining_deadline, 'DD-MM-YYYY h:mm A'),
              ) && (
                <View row>
                  <View style={styles.yellowButton}>
                    <Text style={styles.text2}>Support Sign in</Text>
                  </View>

                  <View style={styles.whiteButton}>
                    <Text style={[styles.text2, {color: 'black'}]}>Maybe</Text>
                  </View>
                </View>
              )}

              <Attendance
                deadline={moment(
                  tripDetails.data.joining_deadline,
                  'DD-MM-YYYY h:mm A',
                )}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
export default TripDetails;
