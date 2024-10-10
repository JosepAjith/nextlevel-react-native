import React, {useEffect, useState} from 'react';
import {
  Button,
  Checkbox,
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
import ButtonView from '../../components/ButtonView';
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../components/Header';
import {styles} from '../addtrip/styles';
import {getUserDate, showToast} from '../../constants/commonUtils';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import DropdownComponent from '../../components/DropdownComponent';
import {JoinRequest} from '../../api/joinTrip/JoinRequest';
import {JoinValidation} from '../../api/joinTrip/JoinValidation';
import {joinTrip, reset} from '../../api/joinTrip/TripJoinSlice';
import BackgroundLoader from '../../components/BackgroundLoader';
import {fetchProfileDetails} from '../../api/profile/ProfileDetailsSlice';
import {fetchTripDetails} from '../../api/trip/TripDetailsSlice';
import LevelView from '../../components/LevelView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import useBackHandler from '../../constants/useBackHandler';

const {TextField} = Incubator;

export type JoinTripNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'JoinTrip'
>;

export type JoinTripRouteProps = RouteProp<RootStackParams, 'JoinTrip'>;

interface Props {}

const Gender = [
  {type: 'Female', id: 'Female'},
  {type: 'Male', id: 'Male'},
];

const JoinTrip: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<JoinTripNavigationProps>();
  const id = route.params.id;
  const status = route.params.status;
  const type = route.params.type;
  const isDeepLink = route.params.isDeepLink;
  const [agree, setAgree] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {joinData, loadingJoin, joinError} = useSelector(
    (state: RootState) => state.TripJoin,
  );
  const [joinInput, setJoin] = useState<JoinRequest>(new JoinRequest());
  const [joinValidate, setValidate] = useState<JoinValidation>(
    new JoinValidation(),
  );
  const {tripDetails, loadingTripDetails} = useSelector(
    (state: RootState) => state.TripDetails,
  );
  const {profileDetails} = useSelector(
    (state: RootState) => state.ProfileDetails,
  );


  useFocusEffect(
    React.useCallback(() => {
      // Add back handler for deep link
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (isDeepLink) {
            navigation.replace(RouteNames.BottomTabs); // Navigate to bottom tabs
          } else {
            navigation.goBack();
          }
          return true; // Prevent default behavior
        },
      );

      // Clean-up function
      return () => backHandler.remove();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchProfileDetails({requestBody: ''}));
      return()=>{}
    },[])
  )

  useEffect(() => {
    if (isDeepLink == true) {
      fetchDetails();
      removeDeepLink();
    }
  }, [isDeepLink]);

  const removeDeepLink = async () => {
    await AsyncStorage.removeItem(AppStrings.DEEP_LINK_ID);
  };

  const fetchDetails = () => {
    let request = JSON.stringify({
      id: id,
    });
    dispatch(fetchTripDetails({requestBody: request}));
  };

  useEffect(() => {
    if (type == 'edit') {
      if (tripDetails && typeof tripDetails.data.trip_book === 'object') {
        const item = tripDetails.data.trip_book;

        setJoin({
          ...joinInput,
          name: item.name,
          phone: item.phone,
          gender: item.gender,
          vehicle: item.vehicle,
          passenger: item.passenger.toString(),
          application_status: status,
        });
      }
    } else if (type == 'join') {
      if (profileDetails && typeof profileDetails.user === 'object') {
        const item = profileDetails?.user;

        setJoin({
          ...joinInput,
          name: item.name,
          phone: item.phone ? item.phone : '',
          gender: item.gender ? item.gender : '',
          vehicle: item.cars && item.cars.length > 0 ? item.cars[0].model_name : '' ,
          passenger: '',
          application_status: status,
        });
      }
    }
  }, [type, profileDetails, tripDetails]);

  function isValidate(): boolean {
    if (joinInput.name == '') {
      setValidate({
        ...joinValidate,
        InvalidName: true,
        error: '*Required',
      });
      return false;
    }
    if (joinInput.phone == '') {
      setValidate({
        ...joinValidate,
        InvalidPhone: true,
        error: '*Required',
      });
      return false;
    }
    if (joinInput.gender == '') {
      setValidate({
        ...joinValidate,
        InvalidGender: true,
        error: '*Required',
      });
      return false;
    }
    if (joinInput.vehicle == '') {
      setValidate({
        ...joinValidate,
        InvalidVehicle: true,
        error: '*Required',
      });
      return false;
    }
    if (joinInput.passenger == '') {
      setValidate({
        ...joinValidate,
        InvalidPassenger: true,
        error: '*Required',
      });
      return false;
    }

    if (!agree) {
      showToast('Agree to your policy to register');
      return false;
    }

    return true;
  }

  const joiningTrip = async () => {
    let request = {};
    if (type === 'edit') {
      //for editing ride
      request = {
        trip_booking_id: id,
        ...joinInput,
      };
    } else {
      request = {
        is_link: isDeepLink ? 1 : 0,
        trip_id: id,
        ...joinInput,
      };
    }

    dispatch(
      joinTrip({
        requestBody: request,
        uri:
          type == 'edit' ? 'booking/trip-book-update' : 'booking/trip-booking',
      }),
    )
      .then(() => {
          if (!profileDetails?.user.image) {
            navigation.navigate(RouteNames.EditProfile);
          } else if (profileDetails.user.cars.length == 0) {
            navigation.navigate(RouteNames.AddCar, { id: 0 });
          }
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (joinData != null) {
      if (!loadingJoin && !joinError && joinData.status) {
        showToast(joinData.message);
        if (isDeepLink) {
          navigation.replace(RouteNames.BottomTabs);
        } else {
          navigation.goBack();
        }
      } else {
        showToast(joinData.message);
      }
    }
  }, [joinData]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}} // Make sure it takes full height of the screen
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Adjust behavior for iOS
    >
      <View flex backgroundColor={AppColors.Black}>
        {isDeepLink && loadingTripDetails && <BackgroundLoader />}
        <ScrollView keyboardShouldPersistTaps="handled">
          <View padding-20>
            <Header
              title={type == 'edit' ? 'Edit Ride' : 'Join Ride'}
              isDeepLink={isDeepLink}
            />

            {isDeepLink && (
              <View style={styles.detailView}>
                <View row centerV>
                  <View flex>
                    <Text style={styles.title}>{tripDetails?.data.title}</Text>
                  </View>

                  <View
                    style={styles.statusView}
                    backgroundColor={
                      tripDetails?.data.trip_status == 'completed'
                        ? '#BBFD79'
                        : tripDetails?.data.trip_status == 'ongoing'
                        ? 'orange'
                        : tripDetails?.data.trip_status == 'upcoming'
                        ? 'yellow'
                        : tripDetails?.data.trip_status == 'cancelled'
                        ? 'red'
                        : '#BBFD79'
                    }>
                    <Text style={styles.statusText}>
                      {tripDetails?.data.trip_status == 'completed'
                        ? 'closed'
                        : tripDetails?.data.trip_status}
                    </Text>
                  </View>
                </View>

                <View row centerV marginV-10>
                  <View flex row centerV>
                    <Text style={styles.text1}>Capacity</Text>
                    <View style={styles.capView}>
                      <Text style={styles.capty}>
                        {tripDetails?.data.trip_book_joined_count} /{' '}
                        {tripDetails?.data.capacity}
                      </Text>
                    </View>
                  </View>

                  <View flex row centerV right>
                    <Text style={styles.text1}>{tripDetails?.data.level}</Text>
                    <LevelView level={tripDetails?.data.level} />
                  </View>
                </View>

                <View>
                  <Text style={[styles.text, {textAlign: 'auto'}]}>
                    "{tripDetails?.data.description}"
                  </Text>
                </View>
              </View>
            )}

            {loadingJoin && <BackgroundLoader />}
            <TextField
              fieldStyle={styles.field}
              label={'Name'}
              placeholder={'Enter name'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginV-20
              value={joinInput.name}
              onChangeText={(text: any) => {
                setJoin({...joinInput, name: text});
                setValidate({...joinValidate, InvalidName: false});
              }}
              trailingAccessory={
                <Text red10>{joinValidate.InvalidName ? '*Required' : ''}</Text>
              }
            />

            <Text style={styles.label}>Gender</Text>
            <DropdownComponent
              data={Gender}
              item={joinInput.gender}
              label="type"
              value="id"
              onChange={(item: any) => {
                setJoin({...joinInput, gender: item});
                setValidate({...joinValidate, InvalidGender: false});
              }}
              error={joinValidate.InvalidGender}
            />

            <TextField
              fieldStyle={styles.field}
              label={'Phone Number'}
              placeholder={'Enter phone number'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              keyboardType={'number-pad'}
              paddingH-20
              marginB-20
              value={joinInput.phone}
              onChangeText={(text: any) => {
                setJoin({...joinInput, phone: text});
                setValidate({...joinValidate, InvalidPhone: false});
              }}
              trailingAccessory={
                <Text red10>
                  {joinValidate.InvalidPhone ? '*Required' : ''}
                </Text>
              }
            />

            <TextField
              fieldStyle={styles.field}
              label={'Vehicle'}
              placeholder={'Enter vehicle name'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginB-20
              value={joinInput.vehicle}
              onChangeText={(text: any) => {
                setJoin({...joinInput, vehicle: text});
                setValidate({...joinValidate, InvalidVehicle: false});
              }}
              trailingAccessory={
                <Text red10>
                  {joinValidate.InvalidVehicle ? '*Required' : ''}
                </Text>
              }
            />

            <TextField
              fieldStyle={styles.field}
              label={'Passengers'}
              placeholder={'Enter passengers count'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              keyboardType={'number-pad'}
              paddingH-20
              marginB-20
              value={joinInput.passenger}
              onChangeText={(text: any) => {
                setJoin({...joinInput, passenger: text});
                setValidate({...joinValidate, InvalidPassenger: false});
              }}
              trailingAccessory={
                <Text red10>
                  {joinValidate.InvalidPassenger ? '*Required' : ''}
                </Text>
              }
            />

            <View row centerV marginB-20>
              <Checkbox
                value={agree}
                label={
                  <Text
                    style={[styles.forgot, {color: 'white', lineHeight: 20}]}>
                    I have read and agree to the club indemnity{'\n'}
                    <Text style={styles.lineText}>
                      You must accept club indemnity to continue.
                    </Text>
                  </Text>
                }
                color={AppColors.Orange}
                style={{borderColor: 'white'}}
                onValueChange={value => setAgree(value)}
              />
            </View>

            <ButtonView
              title={type == 'edit' ? 'Update' : 'Join'}
              onPress={() => {
                if (isValidate()) {
                  joiningTrip();
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
export default JoinTrip;
