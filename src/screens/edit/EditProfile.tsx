import React, {useState} from 'react';
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

const {TextField} = Incubator;

export type EditProfileNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'EditProfile'
>;

export type EditProfileRouteProps = RouteProp<RootStackParams, 'EditProfile'>;

interface Props {}

const EditProfile: React.FC<Props> = () => {
  const navigation = useNavigation<EditProfileNavigationProps>();

  return (
    <ScrollView style={{backgroundColor: AppColors.Black}}>
      <View flex backgroundColor={AppColors.Black} padding-20>
        <Header title="Edit Profile" />

        <TextField
          fieldStyle={styles.field}
          label={'Full Name'}
          placeholder={'Enter full name'}
          placeholderTextColor={'#999999'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginT-30
          marginB-20
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

        <TextField
          fieldStyle={styles.field}
          label={'Gender'}
          placeholder={'Select level'}
          placeholderTextColor={'#999999'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-20
          trailingAccessory={
            <Image
              source={AppImages.DOWN}
              tintColor="#3F4E59"
              width={11}
              height={6}
            />
          }
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
        />

        <TextField
          fieldStyle={styles.field}
          label={'Emirate'}
          placeholder={'Select Emirate'}
          placeholderTextColor={'#999999'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-20
          trailingAccessory={
            <Image
              source={AppImages.DOWN}
              tintColor="#3F4E59"
              width={11}
              height={6}
            />
          }
        />

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
  );
};
export default EditProfile;
