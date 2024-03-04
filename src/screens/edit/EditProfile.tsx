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
import AppFonts from '../../constants/AppFonts';
import {styles} from '../addtrip/styles';
import {showToast} from '../../constants/commonUtils';
import DocumentPicker from 'react-native-document-picker';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {ProfileRequest} from '../../api/profile/ProfileRequest';
import {ProfileValidation} from '../../api/profile/ProfileValidation';
import DropdownComponent from '../../components/DropdownComponent';
import ImageSelector from '../../components/ImageSelector';

const {TextField} = Incubator;

export type EditProfileNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'EditProfile'
>;

export type EditProfileRouteProps = RouteProp<RootStackParams, 'EditProfile'>;

interface Props {}

const Gender = [
  {type: 'Female', id: 1},
  {type: 'Male', id: 2},
  {type: 'Other', id: 3},
];
const Emirates = [
  {type: 'Abu Dhabi', id: 1},
  {type: 'Ajman', id: 2},
  {type: 'Sharjah', id: 3},
  {type: 'Dubai', id: 4},
  {type: 'Fujairah', id: 5},
  {type: 'ras Al Khairah', id: 6},
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
  const [isImageClick, setImageClick] = useState(false)

  useEffect(() => {
    if (profileDetails && typeof profileDetails.user === 'object') {
      const item = profileDetails.user;
  
      setProfile({
        ...profileInput,
        name: item.name,
        dob: item.dob,
        phone: item.phone,
        gender: item.gender,
        location: item.location,
        emirates: item.emirates,
        nationality: item.nationality,
        occupation: item.occupation,
        interest: item.interest,
        referred_by: item.referred_by,
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

  return (
      <View flex backgroundColor={AppColors.Black}>
        <ScrollView>
          <View padding-20>
      
        <Header title="Edit Profile" />

        <TouchableOpacity onPress={()=>setImageClick(!isImageClick)}>
          <View center style={styles.imageView}>
            {/* {carInput.image.uri ? (
              <Image
                source={{uri: carInput.image.uri}}
                style={{width: '100%', height: '100%', borderRadius: 20}}
              />
            ) : (
              <> */}
            <Image source={AppImages.GALLERY} width={34} height={30} />
            <Text style={styles.add}>+ Add Profile Image</Text>
            <Text style={styles.click}>
              (Click From camera or browse to upload)
            </Text>
            {/* <Text red10>{carValidate.InvalidImage ? '*Required' : ''}</Text> */}
            {/* </>
            )} */}
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
            <Text red10>{profileValidate.InvalidName ? '*Required' : ''}</Text>
          }
        />

        <TextField
          fieldStyle={styles.field}
          label={'Date of Birth'}
          placeholder={'Enter date of birth'}
          placeholderTextColor={'#999999'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-20
        />

        <TextField
          fieldStyle={styles.field}
          label={'Contact Number'}
          placeholder={'Enter contact number'}
          placeholderTextColor={'#999999'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-20
        />

        <Text style={styles.label}>Gender</Text>
        <DropdownComponent data={Gender} label="type" value="id" />

        <TextField
          fieldStyle={styles.field}
          label={'Location'}
          placeholder={'Select location'}
          placeholderTextColor={'#999999'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-20
        />

        <Text style={styles.label}>Emirate</Text>
        <DropdownComponent data={Emirates} label="type" value="id" />

        <TextField
          fieldStyle={styles.field}
          label={'Nationality'}
          placeholder={'Select nationality'}
          placeholderTextColor={'#999999'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-20
        />

        <TextField
          fieldStyle={styles.field}
          label={'Occupation'}
          placeholder={'Enter occupation'}
          placeholderTextColor={'#999999'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-20
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
        />

        <ButtonView title="Update Profile" onPress={() => {}} />
              
        </View>
        </ScrollView>
        {isImageClick && <ImageSelector close={()=>setImageClick(false)} />}
      </View>
  );
};
export default EditProfile;
