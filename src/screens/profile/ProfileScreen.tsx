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
import {Dropdown} from 'react-native-element-dropdown';
import {reset, updateRole} from '../../api/levelUpdate/UpdateRoleSlice';
import {showToast} from '../../constants/commonUtils';

const {TextField} = Incubator;

export type ProfileScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ProfileScreen'
>;

export type ProfileScreenRouteProps = RouteProp<
  RootStackParams,
  'ProfileScreen'
>;

const Level = [
  {type: 'First Join', id: 'First Join'},
  {type: 'newbie', id: 'newbie'},
  {type: 'newbie+', id: 'newbie+'},
  {type: 'Intermediate', id: 'Intermediate'},
  {type: 'Intermediate+', id: 'Intermediate+'},
  {type: 'Advanced', id: 'Advanced'},
];

interface Props {
  isReplace?: any;
}

const ProfileScreen: React.FC<Props> = ({isReplace}: Props) => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const [tab, setTab] = useState('personal');
  const [openTab, setOpenTab] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {profileDetails, loadingProfileDetails, profileDetailsError} =
    useSelector((state: RootState) => state.ProfileDetails);
  const {userId, type} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );
  const {updateRoleData, loadingRoleUpdate, roleUpdateError} = useSelector(
    (state: RootState) => state.UpdateRole,
  );

  useFocusEffect(
    React.useCallback(() => {
      let request = {id: userId};
      dispatch(fetchProfileDetails({requestBody: userId == 0 ? '' : request}));

      return () => {
        setTab('personal');
      };
    }, [updateRoleData]),
  );

  const updatingRole = async (id: any, level: string) => {
    let request = {
      id: id,
      level: level,
    };
    dispatch(
      updateRole({
        requestBody: request,
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (updateRoleData != null) {
      if (!loadingRoleUpdate && !roleUpdateError && updateRoleData.status) {
        showToast(updateRoleData.message);
      } else {
        showToast(updateRoleData.message);
      }
    }
  }, [updateRoleData]);

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
            <Text style={styles.name}>{profileDetails?.user.nick_name}</Text>
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
                      : profileDetails?.user.level == 'Explorer'
                      ? 2
                      : profileDetails?.user.level == 'Advanced'
                      ? 1
                      : 0,
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

          {userId == 0 ? (
            <View flex right>
              <TouchableOpacity
                onPress={() => navigation.navigate(RouteNames.SettingsScreen)}>
                <Image source={AppImages.SETTINGS} width={30} height={30} />
              </TouchableOpacity>
            </View>
          ) : (
            (profileDetails?.user.level == 'Marshal' || profileDetails?.user.level == 'Super Marshal') ?
            <View/>
            : (
              <Dropdown
                style={styles.role}
                placeholderStyle={styles.roleText}
                selectedTextStyle={styles.roleText}
                inputSearchStyle={styles.roleText}
                itemTextStyle={{fontSize: 12, color: 'black'}}
                data={Level}
                search
                maxHeight={300}
                labelField={'type'}
                valueField={'id'}
                placeholder="Update Role"
                value={profileDetails?.user.level}
                searchPlaceholder="Search..."
                onChange={items => {
                  updatingRole(profileDetails?.user.id, items.type);
                }}
                renderRightIcon={() => (
                  <View row centerV>
                    <Text red10></Text>
                    <Image
                      source={AppImages.DOWN}
                      tintColor="#3F4E59"
                      width={11}
                      height={6}
                    />
                  </View>
                )}
                renderItem={dropdownItem => {
                  const currentIndex = Level.findIndex(
                    level => level.type === profileDetails?.user.level,
                  );
                  const itemIndex = Level.findIndex(
                    level => level.type === dropdownItem.type,
                  );
                  // Check if the item is adjacent to the current item
                  const isAdjacent = Math.abs(currentIndex - itemIndex) <= 1;
                  if (isAdjacent) {
                    return (
                      <View margin-10>
                        <Text style={styles.roleText}>{dropdownItem.type}</Text>
                      </View>
                    );
                  } else {
                    return null; // Render nothing for non-adjacent items
                  }
                }}
              />
            )
          )}
        </View>

        <View style={styles.middle}>
          <View style={styles.middle1}>
            <TouchableOpacity onPress={() => setTab('personal')}>
              <View
                backgroundColor={tab == 'personal' ? AppColors.Orange : 'white'}
                style={styles.inner}
                centerV>
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
                style={styles.inner}
                centerV>
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
                style={styles.inner}
                centerV>
                <Text
                  color={tab == 'activity' ? 'white' : AppColors.Black}
                  style={styles.tabText}>
                  Activities
                </Text>
              </View>
            </TouchableOpacity>

            {userId == 0 && (
              <TouchableOpacity onPress={() => setOpenTab(!openTab)}>
                <View
                  backgroundColor={'black'}
                  style={[styles.inner, {paddingHorizontal: 5}]}
                  centerV>
                  <Image
                    source={openTab ? AppImages.UP : AppImages.DOWN}
                    tintColor={AppColors.Orange}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>

          {openTab && (
            <>
              <View
                style={{
                  borderTopColor: 'rgba(255,255,255,0.2)',
                  borderTopWidth: 1,
                }}
                marginV-10
              />

              <View row>
                {userId == 0 && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(RouteNames.MarshalList)}>
                    <View
                      backgroundColor={'white'}
                      style={styles.inner}
                      marginR-20>
                      <Text color={AppColors.Black} style={styles.tabText}>
                        View marshal list
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                {(type == 'Marshal' || type == 'Super Marshal') &&
                  userId == 0 && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate(RouteNames.UserList)}>
                      <View backgroundColor={'white'} style={styles.inner}>
                        <Text color={AppColors.Black} style={styles.tabText}>
                          View user list
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
              </View>
            </>
          )}
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
