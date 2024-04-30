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
import {KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import {styles} from '../addtrip/styles';
import {
  getCurrentDateDb,
  getUserDate,
  showToast,
} from '../../constants/commonUtils';
import DocumentPicker from 'react-native-document-picker';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {ProfileRequest} from '../../api/profile/ProfileRequest';
import {ProfileValidation} from '../../api/profile/ProfileValidation';
import DropdownComponent from '../../components/DropdownComponent';
import ImageSelector from '../../components/ImageSelector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {editProfile, reset} from '../../api/profile/EditProfileSlice';
import moment from 'moment';
import BackgroundLoader from '../../components/BackgroundLoader';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import { fetchProfileDetails } from '../../api/profile/ProfileDetailsSlice';

const {TextField} = Incubator;

export type EditProfileNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'EditProfile'
>;

export type EditProfileRouteProps = RouteProp<RootStackParams, 'EditProfile'>;

interface Props {}

const Gender = [
  {type: 'Female', id: 'Female'},
  {type: 'Male', id: 'Male'},
  {type: 'Other', id: 'Other'},
];
const Emirates = [
  {type: 'Abu Dhabi', id: 'Abu Dhabi'},
  {type: 'Ajman', id: 'Ajman'},
  {type: 'Sharjah', id: 'Sharjah'},
  {type: 'Dubai', id: 'Dubai'},
  {type: 'Fujairah', id: 'Fujairah'},
  {type: 'ras Al Khairah', id: 'ras Al Khairah'},
];

const EditProfile: React.FC<Props> = () => {
  const navigation = useNavigation<EditProfileNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {editProfileData, loadingEditProfile, editProfileError} = useSelector(
    (state: RootState) => state.EditProfile,
  );
  const [profileInput, setProfile] = useState<ProfileRequest>(
    new ProfileRequest(),
  );
  const [profileValidate, setValidate] = useState<ProfileValidation>(
    new ProfileValidation(),
  );
  const {profileDetails} = useSelector(
    (state: RootState) => state.ProfileDetails,
  );
  const { IsNetConnected } = useSelector(
    (state: RootState) => state.GlobalVariables,
  );
  const [isImageClick, setImageClick] = useState(false);
  const [isNationClick, setNationClick] = useState(false);

  useEffect(() => {
    if (profileDetails && typeof profileDetails.user === 'object') {
      const item = profileDetails.user;
      setProfile({
        ...profileInput,
        name: item.name ? item.name : '',
        dob: item.dob ? getUserDate(item.dob) : '',
        phone: item.phone ? item.phone : '',
        gender: item.gender ? item.gender : '',
        location: item.location ? item.location : '',
        emirates: item.emirates ? item.emirates : '',
        nationality: item.nationality ? item.nationality : '',
        occupation: item.occupation ? item.occupation : '',
        interest: item.interest ? item.interest : '',
        referred_by: item.referred_by ? item.referred_by : '',
        image: {
          uri: item.image,
          type: 'image/png',
          name: 'image.png',
          size: '',
          fileCopyUri: '',
        },
      });
    }
  }, [profileDetails]);

  function isValidate(): boolean {
    if (!IsNetConnected) {
      showToast('Need internet connection');
      return false;
    }
    if (profileInput.image.uri == '') {
      setValidate({
        ...profileValidate,
        InvalidImage: true,
        error: '*Required',
      });
      showToast("Image Field required")
      return false;
    }
    if (profileInput.name == '') {
      setValidate({
        ...profileValidate,
        InvalidName: true,
        error: '*Required',
      });
      showToast("Name Field required")
      return false;
    }
    if (profileInput.dob == '') {
      setValidate({
        ...profileValidate,
        InvalidDob: true,
        error: '*Required',
      });
      showToast("DOB Field required")
      return false;
    }
    if (profileInput.phone == '') {
      setValidate({
        ...profileValidate,
        InvalidPhone: true,
        error: '*Required',
      });
      showToast("Phone Field required")
      return false;
    }
    if (profileInput.gender == '') {
      setValidate({
        ...profileValidate,
        InvalidGender: true,
        error: '*Required',
      });
      showToast("Gender Field required")
      return false;
    }
    if (profileInput.location == '') {
      setValidate({
        ...profileValidate,
        InvalidLocation: true,
        error: '*Required',
      });
      showToast("Location Field required")
      return false;
    }
    if (profileInput.emirates == '') {
      setValidate({
        ...profileValidate,
        InvalidEmirates: true,
        error: '*Required',
      });
      showToast("Emirates Field required")
      return false;
    }
    if (profileInput.nationality == '') {
      setValidate({
        ...profileValidate,
        InvalidNation: true,
        error: '*Required',
      });
      showToast("Nationality Field required")
      return false;
    }
    if (profileInput.occupation == '') {
      setValidate({
        ...profileValidate,
        InvalidOccup: true,
        error: '*Required',
      });
      showToast("Occupation Field required")
      return false;
    }
    if (profileInput.interest == '') {
      setValidate({
        ...profileValidate,
        InvalidInterest: true,
        error: '*Required',
      });
      showToast("Interest Field required")
      return false;
    }

    return true;
  }

  const updatingProfile = async () => {
    let formData = new FormData();
    formData.append('name', profileInput.name);
    formData.append('image', {
      uri: profileInput.image.uri,
      name: profileInput.image.name,
      type: profileInput.image.type,
    });
    formData.append(
      'dob',
      moment(profileInput.dob, 'DD-MM-YYYY', true).format('YYYY-MM-DD'),
    );
    formData.append('phone', profileInput.phone);
    formData.append('gender', profileInput.gender);
    formData.append('location', profileInput.location);
    formData.append('emirates', profileInput.emirates);
    formData.append('nationality', profileInput.nationality);
    formData.append('occupation', profileInput.occupation);
    formData.append('interest', profileInput.interest);
    formData.append('referred_by', profileInput.referred_by);

    dispatch(
      editProfile({
        requestBody: formData,
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (editProfileData != null) {
      if (!loadingEditProfile && !editProfileError && editProfileData.status) {
        showToast(editProfileData.message);
        dispatch(fetchProfileDetails({requestBody: ''}));
        navigation.goBack();
      } else {
        showToast(editProfileData.message);
      }
    }
  }, [editProfileData]);

  const showDatePicker = () => {
    setValidate({...profileValidate, isDatePickerVisible: true});
  };

  const hideDatePicker = () => {
    setValidate({...profileValidate, isDatePickerVisible: false});
  };

  const handleConfirm = (date: any) => {
    setValidate({...profileValidate, isDatePickerVisible: false, InvalidDob: false});
    setProfile({...profileInput, dob: getUserDate(date)});
  };

  const onCountrySelect = (country: { name: any; }) => {
    setProfile({...profileInput, nationality: country.name});
    setValidate({...profileValidate, InvalidNation: false});
    setNationClick(false);
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }} // Make sure it takes full height of the screen
    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Adjust behavior for iOS
  >
    <View flex backgroundColor={AppColors.Black}>
      {loadingEditProfile && <BackgroundLoader />}
      <ScrollView>
        <View padding-20>
          <Header title="Edit Profile" />

          <TouchableOpacity onPress={() => setImageClick(!isImageClick)}>
            <View center style={styles.imageView}>
              {profileInput.image.uri ? (
                <Image
                  source={{uri: profileInput.image.uri}}
                  style={{width: '100%', height: '100%', borderRadius: 20}}
                />
              ) : (
                <>
                  <Image source={AppImages.GALLERY} width={34} height={30} />
                  <Text style={styles.add}>+ Add Profile Image</Text>
                  <Text style={styles.click}>
                    (Click From camera or browse to upload)
                  </Text>
                  <Text red10>
                    {profileValidate.InvalidImage ? '*Required' : ''}
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>

          <TextField
            fieldStyle={styles.field}
            label={'Full Name'}
            placeholder={'Enter full name'}
            placeholderTextColor={'#999999'}
            labelStyle={styles.label}
            style={styles.text}
            paddingH-20
            marginB-20
            value={profileInput.name}
            onChangeText={(text: any) => {
              setProfile({...profileInput, name: text});
              setValidate({...profileValidate, InvalidName: false});
            }}
            trailingAccessory={
              <Text red10>
                {profileValidate.InvalidName ? '*Required' : ''}
              </Text>
            }
          />

          <TouchableOpacity onPress={showDatePicker}>
            <TextField
              fieldStyle={styles.field}
              label={'Date of Birth'}
              placeholder={'Enter date of birth'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              editable={false}
              paddingH-20
              marginB-20
              value={profileInput.dob}
              trailingAccessory={
                <Text red10>
                  {profileValidate.InvalidDob ? '*Required' : ''}
                </Text>
              }
            />
            <DateTimePickerModal
              isVisible={profileValidate.isDatePickerVisible}
              mode="date"
              date={
                profileInput.dob
                  ? new Date(
                      moment(profileInput.dob, 'DD-MM-YYYY', false).format(
                        'YYYY-MM-DD',
                      ),
                    )
                  : new Date()
              }
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </TouchableOpacity>

          <TextField
            fieldStyle={styles.field}
            label={'Contact Number'}
            placeholder={'Enter contact number'}
            placeholderTextColor={'#999999'}
            labelStyle={styles.label}
            style={styles.text}
            keyboardType={'number-pad'}
            paddingH-20
            marginB-20
            value={profileInput.phone}
            onChangeText={(text: any) => {
              setProfile({...profileInput, phone: text});
              setValidate({...profileValidate, InvalidPhone: false});
            }}
            trailingAccessory={
              <Text red10>
                {profileValidate.InvalidPhone ? '*Required' : ''}
              </Text>
            }
          />

          <Text style={styles.label}>Gender</Text>
          <DropdownComponent
            data={Gender}
            item={profileInput.gender}
            label="type"
            value="id"
            onChange={(item: any) => {
              setProfile({...profileInput, gender: item});
              setValidate({...profileValidate, InvalidGender: false});
            }}
            error={profileValidate.InvalidGender}
          />

          <TextField
            fieldStyle={styles.field}
            label={'Location'}
            placeholder={'Select location'}
            placeholderTextColor={'#999999'}
            labelStyle={styles.label}
            style={styles.text}
            paddingH-20
            marginB-20
            value={profileInput.location}
            onChangeText={(text: any) => {
              setProfile({...profileInput, location: text});
              setValidate({...profileValidate, InvalidLocation: false});
            }}
            trailingAccessory={
              <Text red10>
                {profileValidate.InvalidLocation ? '*Required' : ''}
              </Text>
            }
          />

          <Text style={styles.label}>Emirate</Text>
          <DropdownComponent
            data={Emirates}
            item={profileInput.emirates}
            label="type"
            value="id"
            onChange={(item: any) => {
              setProfile({...profileInput, emirates: item});
              setValidate({...profileValidate, InvalidEmirates: false});
            }}
            error={profileValidate.InvalidEmirates}
          />

          <TouchableOpacity onPress={() => setNationClick(!isNationClick)}>
            <TextField
              fieldStyle={styles.field}
              label={'Nationality'}
              placeholder={'Select nationality'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              paddingH-20
              marginB-20
              editable={false}
              value={profileInput.nationality}
              trailingAccessory={
                <Text red10>
                  {profileValidate.InvalidNation ? '*Required' : ''}
                </Text>
              }
            />
          </TouchableOpacity>

          <TextField
            fieldStyle={styles.field}
            label={'Occupation'}
            placeholder={'Enter occupation'}
            placeholderTextColor={'#999999'}
            labelStyle={styles.label}
            style={styles.text}
            paddingH-20
            marginB-20
            value={profileInput.occupation}
            onChangeText={(text: any) => {
              setProfile({...profileInput, occupation: text});
              setValidate({...profileValidate, InvalidOccup: false});
            }}
            trailingAccessory={
              <Text red10>
                {profileValidate.InvalidOccup ? '*Required' : ''}
              </Text>
            }
          />

          <TextField
            fieldStyle={styles.field}
            label={'Interest'}
            placeholder={'Enter interest'}
            placeholderTextColor={'#999999'}
            labelStyle={styles.label}
            style={styles.text}
            paddingH-20
            marginB-20
            value={profileInput.interest}
            onChangeText={(text: any) => {
              setProfile({...profileInput, interest: text});
              setValidate({...profileValidate, InvalidInterest: false});
            }}
            trailingAccessory={
              <Text red10>
                {profileValidate.InvalidInterest ? '*Required' : ''}
              </Text>
            }
          />

          <TextField
            fieldStyle={styles.field}
            label={'Referred By'}
            placeholder={'Select who referred'}
            placeholderTextColor={'#999999'}
            labelStyle={styles.label}
            style={styles.text}
            paddingH-20
            marginB-20
            value={profileInput.referred_by}
            onChangeText={(text: any) => {
              setProfile({...profileInput, referred_by: text});
            }}
          />

          <ButtonView
            title="Update Profile"
            onPress={() => {
              if (isValidate()) {
                updatingProfile();
              }
            }}
          />
        </View>
      </ScrollView>
      {isImageClick && (
        <ImageSelector
          close={() => setImageClick(false)}
          isItem={(item: any) => {
            setProfile({...profileInput, image: item});
            setValidate({...profileValidate, InvalidImage: false});
          }}
        />
      )}

      {isNationClick && (
        <CountryPicker
          withFlag
          withCallingCode
          withModal
          visible={isNationClick}
          onSelect={onCountrySelect}
          onClose={() => setNationClick(false)}
          countryCode={'IN'}
          withFilter
          theme={DARK_THEME}
        />
      )}
    </View>
    </KeyboardAvoidingView>
  );
};
export default EditProfile;
