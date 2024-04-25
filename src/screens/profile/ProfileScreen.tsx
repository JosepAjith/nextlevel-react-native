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
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import Personal from './Personal';
import Activities from './Activities';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfileDetails} from '../../api/profile/ProfileDetailsSlice';
import MyCars from './MyCars';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

export type ProfileScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ProfileScreen'
>;

export type ProfileScreenRouteProps = RouteProp<
  RootStackParams,
  'ProfileScreen'
>;

interface Props {
  isReplace?: any;
}

const ProfileScreen: React.FC<Props> = ({isReplace}: Props) => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const [tab, setTab] = useState('personal');
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {profileDetails, loadingProfileDetails, profileDetailsError} =
    useSelector((state: RootState) => state.ProfileDetails);
  const {userId} = useSelector((state: RootState) => state.GlobalVariables);

  useFocusEffect(
    React.useCallback(() => {
      let request = {id: userId};
      dispatch(fetchProfileDetails({requestBody: userId == 0 ? '' : request}));

      return () => {
        setTab('personal');
      };
    }, []),
  );


  return (
    <ScrollView style={{backgroundColor: AppColors.Black}}>
      <View flex backgroundColor={AppColors.Black} padding-20>
        {userId == 0 ? (
          <Header leftIcon={false} title="Profile" />
        ) : (
          <Header title="Profile" />
        )}

        {loadingProfileDetails && <BackgroundLoader />}

        <View row marginV-20>
          <View flex>
            <View marginB-10 style={styles.imageView}>
              <Image
                source={
                  profileDetails?.user.image
                    ? {uri: profileDetails.user.image}
                    : AppImages.PLACEHOLDER
                }
                width={70}
                height={70}
                style={{borderRadius: 35}}
              />
            </View>
            <Text style={styles.name}>{profileDetails?.user.name}</Text>
            <View row marginV-10>
              <Text style={styles.rank}>Rank</Text>
              <View row centerV marginL-20>
                <Text style={[styles.rank, {color: AppColors.Orange}]}>
                  {profileDetails?.user.level}
                </Text>
                {Array.from({
                  length:
                    profileDetails?.user.level == 'Marshal' ||
                    profileDetails?.user.level == 'Super Marshal'
                      ? 3
                      : 1,
                }).map((_, index) => (
                  <Image
                    key={index}
                    source={AppImages.STAR}
                    width={10}
                    height={10}
                    marginL-5
                  />
                ))}
              </View>
            </View>
          </View>

          {userId == 0 && (
            <View flex right>
              <TouchableOpacity
                onPress={() => navigation.navigate(RouteNames.SettingsScreen)}>
                <Image source={AppImages.SETTINGS} width={30} height={30} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.middle}>
          <TouchableOpacity onPress={() => setTab('personal')}>
            <View
              backgroundColor={tab == 'personal' ? AppColors.Orange : 'white'}
              style={styles.inner}>
              <Text
                color={tab == 'personal' ? 'white' : AppColors.Black}
                style={styles.tabText}>
                Personal Info
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('cars')}>
            <View
              backgroundColor={tab == 'cars' ? AppColors.Orange : 'white'}
              style={styles.inner}>
              <Text
                color={tab == 'cars' ? 'white' : AppColors.Black}
                style={styles.tabText}>
                My Cars
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('activity')}>
            <View
              backgroundColor={tab == 'activity' ? AppColors.Orange : 'white'}
              style={styles.inner}>
              <Text
                color={tab == 'activity' ? 'white' : AppColors.Black}
                style={styles.tabText}>
                Activities
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {tab == 'personal' && profileDetails?.status && (
          <Personal data={profileDetails?.user} />
        )}
        {tab == 'cars' && profileDetails?.status && (
          <MyCars navigation={navigation} data={profileDetails.user.cars} />
        )}
        {tab == 'activity' && profileDetails?.status && (
          <Activities
            navigation={navigation}
            data={profileDetails.trip_status_counts}
            isReplace={isReplace}
          />
        )}
      </View>
    </ScrollView>
  );
};
export default ProfileScreen;
