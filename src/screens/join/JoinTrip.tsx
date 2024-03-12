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
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {ScrollView, TouchableOpacity} from 'react-native';
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
  {type: 'Other', id: 'Other'},
];

const JoinTrip: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<JoinTripNavigationProps>();
  const id = route.params.id;
  const status = route.params.status;
  const type = route.params.type;
  const [agree, setAgree] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {joinData, loadingJoin, joinError} = useSelector(
    (state: RootState) => state.TripJoin,
  );
  const [joinInput, setJoin] = useState<JoinRequest>(new JoinRequest());
  const [joinValidate, setValidate] = useState<JoinValidation>(
    new JoinValidation(),
  );
  const {tripDetails} = useSelector((state: RootState) => state.TripDetails);
  const { profileDetails } = useSelector(
    (state: RootState) => state.ProfileDetails,
  );

  useEffect(() => {
    setJoin({...joinInput, application_status: status});
  }, []);

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
        });
      }
    }
    else if (type == 'join') {
      if (profileDetails && typeof profileDetails.user === 'object') {
        const item = profileDetails?.user;

        setJoin({
          ...joinInput,
          name: item.name,
          phone: item.phone,
          gender: item.gender,
          vehicle: '',
          passenger: '',
        });
      }
    }
  }, [type]);

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
        trip_id: id,
        ...joinInput,
      };
    }
   
    dispatch(
      joinTrip({
        requestBody: request,
        uri: type == 'edit' ? 'booking/trip-book-update' : 'booking/trip-booking'
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (joinData != null) {
      if (!loadingJoin && !joinError && joinData.status) {
        showToast(joinData.message);
        navigation.goBack();
      } else {
        showToast(joinData.message);
      }
    }
  }, [joinData]);

  return (
    <View flex backgroundColor={AppColors.Black}>
      <ScrollView>
        <View padding-20>
          <Header title={type == 'edit' ? 'Edit Ride' : 'Join Ride'} />
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
              <Text red10>{joinValidate.InvalidPhone ? '*Required' : ''}</Text>
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
                <Text style={[styles.forgot, {color: 'white', lineHeight: 20}]}>
                  I have read and agree to the club indemnity{' '}
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
  );
};
export default JoinTrip;
