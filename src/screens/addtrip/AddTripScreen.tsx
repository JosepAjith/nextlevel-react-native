import React, {useEffect, useState} from 'react';
import {
  Chip,
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
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../components/Header';
import {TripRequest} from '../../api/trip/TripRequest';
import {TripValidation} from '../../api/trip/TripValidation';
import ImageSelector from '../../components/ImageSelector';
import DropdownComponent from '../../components/DropdownComponent';
import {
  formatTime,
  getDateTime,
  getUserDate,
  getUserTime,
  showToast,
} from '../../constants/commonUtils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {createTrip, reset} from '../../api/trip/TripCreateSlice';
import moment from 'moment';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

export type AddTripScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AddTripScreen'
>;

export type AddTripScreenRouteProps = RouteProp<
  RootStackParams,
  'AddTripScreen'
>;

interface Props {
  route?: any; // or specify the type of route if available
  id?: number; // Make id prop optional
  initial?: any;
}

const Emirates = [
  {type: 'Abu Dhabi', id: 'Abu Dhabi'},
  {type: 'Ajman', id: 'Ajman'},
  {type: 'Sharjah', id: 'Sharjah'},
  {type: 'Dubai', id: 'Dubai'},
  {type: 'Fujairah', id: 'Fujairah'},
  {type: 'ras Al Khairah', id: 'ras Al Khairah'},
];

const Level = [
  {type: 'First Join', id: 'First Join'},
  {type: 'newbie', id: 'newbie'},
  {type: 'newbie+', id: 'newbie+'},
  {type: 'Intermediate Exam', id: 'Intermediate Exam'},
  {type: 'Intermediate', id: 'Intermediate'},
  {type: 'Intermediate+', id: 'Intermediate+'},
  {type: 'Advanced Exam', id: 'Advanced Exam'},
  {type: 'Advanced', id: 'Advanced'},
  {type: 'Get To Gether', id: 'Get To Gether'},
];

const AddTripScreen: React.FC<Props> = ({route, id, initial}: Props) => {
  const navigation = useNavigation<AddTripScreenNavigationProps>();
  let routeId: number | any;
  if (route && route.params) {
    routeId = route.params.id;
  } else {
    routeId = id;
  }

  const [isImageClick, setImageClick] = useState(false);
  const [tripInput, setTrip] = useState<TripRequest>(new TripRequest());
  const [tripValidate, setValidate] = useState<TripValidation>(
    new TripValidation(),
  );
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {addTripData, loadingAddTrip, addTripError} = useSelector(
    (state: RootState) => state.TripCreate,
  );
  const {tripDetails} = useSelector((state: RootState) => state.TripDetails);
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  const handleSelectedUsers = (selectedUsers: any) => {
    if (selectedUsers.length !== 0) {
      setTrip(prevTripInput => ({
        ...prevTripInput,
        users: [
          ...prevTripInput.users,
          ...selectedUsers.filter((selectedUser: any) => 
            !prevTripInput.users.some((user: any) => user.id === selectedUser.id)
          )
        ],
      }));
    }
  };

  const removeUser = (userId: any) => {
    setTrip(prevTripInput => ({
      ...prevTripInput,
      users: prevTripInput.users.filter(user => user.id !== userId),
    }));
  };

  useEffect(() => {
    if (routeId !== 0 && typeof tripDetails?.data === 'object') {
      const item = tripDetails.data;
      // Create a new object to hold the updated trip details
      const updatedTrip = {
        ...tripInput,
        title: item.title,
        city: item.city,
        area_details: item.area_details,
        details_place: item.details_place,
        level: item.level,
        latitude: item.latitude,
        longitude: item.longitude,
        capacity: item.capacity,
        date: getUserDate(item.date),
        meeting_time: formatTime(item.meeting_time),
        start_time: formatTime(item.start_time),
        finish_time: formatTime(item.finish_time),
        joining_start_date: getDateTime(item.joining_start_date),
        joining_deadline: getDateTime(item.joining_deadline),
        description: item.description,
        passenger: String(item.passenger),
      };
  
      // If trip images exist, filter and update the image property
      if (item.trip_images) {
        const filteredImages = item.trip_images.filter(
          imageItem => imageItem.image && imageItem.image !== '/empty.jpg'
        );
        updatedTrip.image = filteredImages.map(imageItem => ({
          uri: imageItem.image,
          type: 'image/png',
          name: 'image.png',
          size: '',
          fileCopyUri: '',
        }));
      }
  
      // Update the users property
      updatedTrip.users = [
        ...tripInput.users,
        ...item.trip_invitation.map(inviteItem => ({
          id: inviteItem.users[0].id,
          name: inviteItem.users[0].name,
          image: inviteItem.users[0].image,
        })),
      ];
  
      // Set the updated trip details into tripInput
      setTrip(updatedTrip);
    }
  }, [routeId, tripDetails]);

  function isValidate(): boolean {
    if (!IsNetConnected) {
      showToast('Need internet connection');
      return false;
    }
    if (tripInput.image.length == 0) {
      setValidate({
        ...tripValidate,
        InvalidImage: true,
        error: '*Required',
      });
      showToast('Image field required');
      return false;
    }

    if (tripInput.title == '') {
      setValidate({
        ...tripValidate,
        InvalidTitle: true,
        error: '*Required',
      });
      showToast('Title field required');
      return false;
    }

    if (tripInput.city == '') {
      setValidate({
        ...tripValidate,
        InvalidCity: true,
        error: '*Required',
      });
      showToast('City field required');
      return false;
    }

    if (tripInput.area_details == '') {
      setValidate({
        ...tripValidate,
        InvalidArea: true,
        error: '*Required',
      });
      showToast('Area field required');
      return false;
    }

    if (tripInput.details_place == '') {
      setValidate({
        ...tripValidate,
        InvalidPlace: true,
        error: '*Required',
      });
      showToast('Place field required');
      return false;
    }

    if (tripInput.level == '') {
      setValidate({
        ...tripValidate,
        InvalidLevel: true,
        error: '*Required',
      });
      showToast('Level field required');
      return false;
    }

    if ((tripInput.level == 'Intermediate Exam' || tripInput.level == 'Advance Exam') && tripInput.users.length == 0) {
      showToast('Users is required if level is ' + tripInput.level);
      return false;
    }

    if (tripInput.capacity == '') {
      setValidate({
        ...tripValidate,
        InvalidCapacity: true,
        error: '*Required',
      });
      showToast('Capacity field required');
      return false;
    }

    if (tripInput.date == '') {
      setValidate({
        ...tripValidate,
        InvalidDate: true,
        error: '*Required',
      });
      showToast('Date field required');
      return false;
    }

    if (tripInput.meeting_time == '') {
      setValidate({
        ...tripValidate,
        InvalidMeet: true,
        error: '*Required',
      });
      showToast('Meeting Time field required');
      return false;
    }

    if (tripInput.start_time == '') {
      setValidate({
        ...tripValidate,
        InvalidStart: true,
        error: '*Required',
      });
      showToast('Start time field required');
      return false;
    }

    if (tripInput.finish_time == '') {
      setValidate({
        ...tripValidate,
        InvalidFinish: true,
        error: '*Required',
      });
      showToast('Finish time field required');
      return false;
    }

    if (tripInput.joining_start_date == '') {
      setValidate({
        ...tripValidate,
        InvalidJoinDate: true,
        error: '*Required',
      });
      showToast('Joining date field required');
      return false;
    }

    if (tripInput.joining_deadline == '') {
      setValidate({
        ...tripValidate,
        InvalidDeadline: true,
        error: '*Required',
      });
      showToast('Deadline date field required');
      return false;
    }

    if (tripInput.description == '') {
      setValidate({
        ...tripValidate,
        InvalidDescrip: true,
        error: '*Required',
      });
      showToast('Description field required');
      return false;
    }

    if (tripInput.passenger == '') {
      setValidate({
        ...tripValidate,
        InvalidPassengers: true,
        error: '*Required',
      });
      showToast('Passenger field required');
      return false;
    }
    return true;
  }

  const AddingTrip = async () => {
    let formData = new FormData();
    if (routeId != 0) {
      formData.append('id', routeId);
    }
    formData.append('title', tripInput.title);
    tripInput.image.forEach((image, index) => {
      formData.append(`image[]`, {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    });
    formData.append('city', tripInput.city);
    formData.append('area_details', tripInput.area_details);
    formData.append('details_place', tripInput.details_place);
    formData.append('longitude', tripInput.longitude);
    formData.append('latitude', tripInput.latitude);
    formData.append('level', tripInput.level);
    if(tripInput.level == 'Intermediate Exam' || tripInput.level == 'Advance Exam'){
      tripInput.users.forEach((user, index) => {
        formData.append(`users_id[]`, user.id);
      });
    }
    formData.append('capacity', tripInput.capacity);
    formData.append(
      'date',
      moment(tripInput.date, 'DD-MM-YYYY', true).format('YYYY-MM-DD'),
    );
    formData.append(
      'meeting_time',
      moment(tripInput.meeting_time, 'h:mm A', true).format('HH:mm:ss'),
    );
    formData.append(
      'start_time',
      moment(tripInput.start_time, 'h:mm A', true).format('HH:mm:ss'),
    );
    formData.append(
      'finish_time',
      moment(tripInput.finish_time, 'h:mm A', true).format('HH:mm:ss'),
    );
    formData.append(
      'joining_start_date',
      moment(tripInput.joining_start_date, 'DD-MM-YYYY h:mm A', true).format(
        'YYYY-MM-DDTHH:mm:ss',
      ),
    );
    formData.append(
      'joining_deadline',
      moment(tripInput.joining_deadline, 'DD-MM-YYYY h:mm A', true).format(
        'YYYY-MM-DDTHH:mm:ss',
      ),
    );
    formData.append('description', tripInput.description);
    formData.append('passenger', tripInput.passenger);
console.log(formData)
    dispatch(
      createTrip({
        requestBody: formData,
        uri: routeId == 0 ? 'trip/save' : 'trip/update',
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    console.log(addTripData)
    if (addTripData != null) {
      if (!loadingAddTrip && !addTripError && addTripData.status) {
        showToast(addTripData.message);
        setTrip(new TripRequest());
        if (routeId == 0) {
          initial();
        } else {
          navigation.goBack();
        }
      } else {
        showToast(addTripData.message);
      }
    }
  }, [addTripData]);

  const removeImage = (indexToRemove: number) => {
    setTrip(prevTripInput => ({
      ...prevTripInput,
      image: prevTripInput.image.filter((_, index) => index !== indexToRemove),
    }));
  };

  const setPlaceLocation = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setTrip({
      ...tripInput,
      details_place: location.address,
      latitude: String(location.latitude),
      longitude: String(location.longitude),
    });
    setValidate({...tripValidate, InvalidPlace: false});
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}} // Make sure it takes full height of the screen
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Adjust behavior for iOS
    >
      <View flex backgroundColor={AppColors.Black}>
        {loadingAddTrip && <BackgroundLoader />}
        <ScrollView>
          <View padding-20>
            {routeId == 0 ? (
              <Header leftIcon={false} title="Create Trip" />
            ) : (
              <Header title="Update Trip" />
            )}

            <TouchableOpacity onPress={() => setImageClick(!isImageClick)}>
              <View center style={styles.imageView}>
                {tripInput.image.length > 0 ? (
                  <>
                    <ScrollView horizontal>
                      {tripInput.image.map((image, index) => (
                        <View key={index}>
                          <Image
                            key={index}
                            source={{uri: image.uri}}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 20,
                              marginRight: 10,
                            }}
                          />
                          <View absT>
                            <TouchableOpacity
                              onPress={() => removeImage(index)}>
                              <Image
                                source={AppImages.DELETE}
                                width={25}
                                height={25}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </ScrollView>
                    <Text style={styles.add}>+ Add Photos</Text>
                  </>
                ) : (
                  <>
                    <Image source={AppImages.GALLERY} width={34} height={30} />
                    <Text style={styles.add}>+ Add Photos</Text>
                    <Text style={styles.click}>
                      (Click From camera or browse to upload)
                    </Text>
                  </>
                )}
                <Text red10>
                  {tripValidate.InvalidImage ? '*Required' : ''}
                </Text>
              </View>
            </TouchableOpacity>

            <TextField
              fieldStyle={styles.field}
              label={'Title'}
              placeholder={'Enter title'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginB-20
              value={tripInput.title}
              onChangeText={(text: any) => {
                setTrip({...tripInput, title: text});
                setValidate({...tripValidate, InvalidTitle: false});
              }}
              trailingAccessory={
                <Text red10>
                  {tripValidate.InvalidTitle ? '*Required' : ''}
                </Text>
              }
            />

            <Text style={styles.label}>City</Text>
            <DropdownComponent
              data={Emirates}
              item={tripInput.city}
              label="type"
              value="id"
              onChange={(item: any) => {
                setTrip({...tripInput, city: item});
                setValidate({...tripValidate, InvalidCity: false});
              }}
              error={tripValidate.InvalidCity}
            />

            <TextField
              fieldStyle={styles.field}
              label={'Area'}
              placeholder={'Enter area details'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginB-20
              value={tripInput.area_details}
              onChangeText={(text: any) => {
                setTrip({...tripInput, area_details: text});
                setValidate({...tripValidate, InvalidArea: false});
              }}
              trailingAccessory={
                <Text red10>{tripValidate.InvalidArea ? '*Required' : ''}</Text>
              }
            />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(RouteNames.MapScreen, {
                  setPlaceLocation,
                  type: routeId == 0 ? 'add' : 'edit',
                  lat: tripInput.latitude,
                  long: tripInput.longitude,
                })
              }>
              <TextField
                fieldStyle={[
                  styles.field,
                  {height: tripInput.details_place ? 100 : 50},
                  tripInput.details_place
                    ? {paddingVertical: 10}
                    : {paddingVertical: 0},
                ]}
                label={'Place Details'}
                placeholder={'Choose Place details'}
                placeholderTextColor={'#999999'}
                labelStyle={styles.label}
                style={styles.text}
                paddingH-20
                marginB-20
                textAlignVertical={tripInput.details_place ? 'top' : 'auto'}
                editable={false}
                multiline={true}
                value={tripInput.details_place}
                // onChangeText={(text: any) => {
                //   setTrip({...tripInput, details_place: text});
                //   setValidate({...tripValidate, InvalidPlace: false});
                // }}
                trailingAccessory={
                  <Text red10>
                    {tripValidate.InvalidPlace ? '*Required' : ''}
                  </Text>
                }
              />
            </TouchableOpacity>

            <Text style={styles.label}>Level</Text>
            <DropdownComponent
              data={Level}
              item={tripInput.level}
              label="type"
              value="id"
              onChange={(item: any) => {
                setTrip({...tripInput, level: item});
                setValidate({...tripValidate, InvalidLevel: false});
                if (
                  item == 'Intermediate Exam' ||
                  item == 'Advance Exam'
                ) {
                  navigation.navigate(RouteNames.UserPicker,{level:item, selectUsers: tripInput.users, onSelectUsers: handleSelectedUsers});
                }
              }}
              error={tripValidate.InvalidLevel}
            />

<View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {tripInput.users && tripInput.users.map((item, index) => (
          <Chip
            key={index}
            borderRadius={22}
            label={item.name}
            labelStyle={styles.chipLabel}
            iconStyle={{width: 16, height: 16}}
            avatarProps={{source: {uri:item.image}, size: 28}}
            onDismiss={() => removeUser(item.id)}
            dismissIconStyle={{width: 10, height: 10,}}
            dismissColor='white'
            containerStyle={[
              styles.chip
            ,{padding:3, marginBottom:10}]}
          />
        ))}
      </View>

            <TextField
              fieldStyle={styles.field}
              label={'Capacity'}
              placeholder={'Enter capacity'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginB-20
              keyboardType={'number-pad'}
              value={tripInput.capacity}
              onChangeText={(text: any) => {
                setTrip({...tripInput, capacity: text});
                setValidate({...tripValidate, InvalidCapacity: false});
              }}
              trailingAccessory={
                <Text red10>
                  {tripValidate.InvalidCapacity ? '*Required' : ''}
                </Text>
              }
            />

            <TouchableOpacity
              onPress={() =>
                setValidate({...tripValidate, isDatePickerVisible: true})
              }>
              <TextField
                fieldStyle={styles.field}
                label={'Date'}
                placeholder={'Select Date'}
                placeholderTextColor={'#999999'}
                labelStyle={styles.label}
                style={styles.text}
                paddingH-20
                marginB-20
                editable={false}
                value={tripInput.date}
                trailingAccessory={
                  <Text red10>
                    {tripValidate.InvalidDate ? '*Required' : ''}
                  </Text>
                }
              />
              <DateTimePickerModal
                isVisible={tripValidate.isDatePickerVisible}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(date: any) => {
                  setTrip({...tripInput, date: getUserDate(date)});
                  setValidate({
                    ...tripValidate,
                    InvalidDate: false,
                    isDatePickerVisible: false,
                  });
                }}
                onCancel={() =>
                  setValidate({...tripValidate, isDatePickerVisible: false})
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setValidate({...tripValidate, isMeetPickerVisible: true})
              }>
              <TextField
                fieldStyle={styles.field}
                label={'Meeting Time'}
                placeholder={'Select meeting time'}
                placeholderTextColor={'#999999'}
                labelStyle={styles.label}
                style={styles.text}
                paddingH-20
                marginB-20
                editable={false}
                value={tripInput.meeting_time}
                trailingAccessory={
                  <Text red10>
                    {tripValidate.InvalidMeet ? '*Required' : ''}
                  </Text>
                }
              />
              <DateTimePickerModal
                isVisible={tripValidate.isMeetPickerVisible}
                mode="time"
                onConfirm={(date: any) => {
                  setTrip({...tripInput, meeting_time: getUserTime(date)});
                  setValidate({
                    ...tripValidate,
                    InvalidMeet: false,
                    isMeetPickerVisible: false,
                  });
                }}
                onCancel={() =>
                  setValidate({...tripValidate, isMeetPickerVisible: false})
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setValidate({...tripValidate, isStartPickerVisible: true})
              }>
              <TextField
                fieldStyle={styles.field}
                label={'Start Time'}
                placeholder={'Select start time'}
                placeholderTextColor={'#999999'}
                labelStyle={styles.label}
                style={styles.text}
                paddingH-20
                marginB-20
                editable={false}
                value={tripInput.start_time}
                trailingAccessory={
                  <Text red10>
                    {tripValidate.InvalidStart ? '*Required' : ''}
                  </Text>
                }
              />
              <DateTimePickerModal
                isVisible={tripValidate.isStartPickerVisible}
                mode="time"
                onConfirm={(date: any) => {
                  setTrip({...tripInput, start_time: getUserTime(date)});
                  setValidate({
                    ...tripValidate,
                    InvalidStart: false,
                    isStartPickerVisible: false,
                  });
                }}
                onCancel={() =>
                  setValidate({...tripValidate, isStartPickerVisible: false})
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setValidate({...tripValidate, isFinishPickerVisible: true})
              }>
              <TextField
                fieldStyle={styles.field}
                label={'Finish Time'}
                placeholder={'Select finish time'}
                placeholderTextColor={'#999999'}
                labelStyle={styles.label}
                style={styles.text}
                paddingH-20
                marginB-20
                editable={false}
                value={tripInput.finish_time}
                trailingAccessory={
                  <Text red10>
                    {tripValidate.InvalidFinish ? '*Required' : ''}
                  </Text>
                }
              />
              <DateTimePickerModal
                isVisible={tripValidate.isFinishPickerVisible}
                mode="time"
                onConfirm={(date: any) => {
                  setTrip({...tripInput, finish_time: getUserTime(date)});
                  setValidate({
                    ...tripValidate,
                    InvalidFinish: false,
                    isFinishPickerVisible: false,
                  });
                }}
                onCancel={() =>
                  setValidate({...tripValidate, isFinishPickerVisible: false})
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (tripInput.joining_deadline == '') {
                  showToast('First select deadline date');
                } else {
                  setValidate({...tripValidate, isJoinPickerVisible: true});
                }
              }}>
              <TextField
                fieldStyle={styles.field}
                label={'Joining Start Date & Time'}
                placeholder={'Select joining date & time'}
                placeholderTextColor={'#999999'}
                labelStyle={styles.label}
                style={styles.text}
                paddingH-20
                marginB-20
                editable={false}
                value={tripInput.joining_start_date}
                trailingAccessory={
                  <Text red10>
                    {tripValidate.InvalidJoinDate ? '*Required' : ''}
                  </Text>
                }
              />
              <DateTimePickerModal
                isVisible={tripValidate.isJoinPickerVisible}
                mode="datetime"
                minimumDate={new Date()}
                maximumDate={moment(
                  tripInput.joining_deadline,
                  'DD-MM-YYYY',
                ).toDate()}
                onConfirm={(date: any) => {
                  setTrip({
                    ...tripInput,
                    joining_start_date: getDateTime(date),
                  });
                  setValidate({
                    ...tripValidate,
                    InvalidJoinDate: false,
                    isJoinPickerVisible: false,
                  });
                }}
                onCancel={() =>
                  setValidate({...tripValidate, isJoinPickerVisible: false})
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (tripInput.date == '') {
                  showToast('First select trip date');
                } else {
                  setValidate({...tripValidate, isDeadlinePickerVisible: true});
                }
              }}>
              <TextField
                fieldStyle={styles.field}
                label={'Joining Deadline Date & Time'}
                placeholder={'Select deadline'}
                placeholderTextColor={'#999999'}
                labelStyle={styles.label}
                style={styles.text}
                paddingH-20
                marginB-20
                editable={false}
                value={tripInput.joining_deadline}
                trailingAccessory={
                  <Text red10>
                    {tripValidate.InvalidDeadline ? '*Required' : ''}
                  </Text>
                }
              />
              <DateTimePickerModal
                isVisible={tripValidate.isDeadlinePickerVisible}
                mode="datetime"
                minimumDate={new Date()}
                maximumDate={moment(tripInput.date, 'DD-MM-YYYY').toDate()}
                onConfirm={(date: any) => {
                  setTrip({...tripInput, joining_deadline: getDateTime(date)});
                  setValidate({
                    ...tripValidate,
                    InvalidDeadline: false,
                    isDeadlinePickerVisible: false,
                  });
                }}
                onCancel={() =>
                  setValidate({...tripValidate, isDeadlinePickerVisible: false})
                }
              />
            </TouchableOpacity>

            <TextField
              fieldStyle={[styles.field, {height: 100}]}
              label={'Description'}
              placeholder={'Enter description'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              padding-20
              marginB-20
              textAlignVertical={'top'}
              value={tripInput.description}
              onChangeText={(text: any) => {
                setTrip({...tripInput, description: text});
                setValidate({...tripValidate, InvalidDescrip: false});
              }}
              trailingAccessory={
                <Text red10>
                  {tripValidate.InvalidDescrip ? '*Required' : ''}
                </Text>
              }
            />

            <TextField
              fieldStyle={styles.field}
              label={'Passengers Allowed'}
              placeholder={'Enter passengers allowed'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginB-20
              keyboardType={'number-pad'}
              value={tripInput.passenger}
              onChangeText={(text: any) => {
                setTrip({...tripInput, passenger: text});
                setValidate({...tripValidate, InvalidPassengers: false});
              }}
              trailingAccessory={
                <Text red10>
                  {tripValidate.InvalidPassengers ? '*Required' : ''}
                </Text>
              }
            />

            <ButtonView
              title={routeId == 0 ? 'Create Trip' : 'Update Trip'}
              onPress={() => {
                if (isValidate()) {
                  AddingTrip();
                }
              }}
            />
          </View>
        </ScrollView>

        {isImageClick && (
          <ImageSelector
            close={() => setImageClick(false)}
            isItem={(item: any) => {
              setTrip(prevTripInput => ({
                ...prevTripInput,
                image: [...prevTripInput.image, ...item],
              }));

              setValidate({...tripValidate, InvalidImage: false});
            }}
            multi={true}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default AddTripScreen;
