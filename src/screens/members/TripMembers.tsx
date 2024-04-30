import React, {useEffect, useState} from 'react';
import {
  Button,
  Checkbox,
  Chip,
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
import {Dimensions, SectionList, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import {styles} from '../mytrip/styles';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {fetchMemberList} from '../../api/member/MemberListSlice';
import AppFonts from '../../constants/AppFonts';
import {MemberStatusChange, reset} from '../../api/member/MemberStatusSlice';
import {showToast} from '../../constants/commonUtils';
import CustomAlert from '../../components/CustomAlert';

const {TextField} = Incubator;

export type TripMembersNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'TripMembers'
>;

export type TripMembersRouteProps = RouteProp<RootStackParams, 'TripMembers'>;

interface Props {}
const TripMembers: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<TripMembersNavigationProps>();
  const id = route.params.id;
  const userId = route.params.userId;
  const status = route.params.status;
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {loginUserId} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );
  const {members, loadingMembers, membersError} = useSelector(
    (state: RootState) => state.MemberList,
  );
  const {statusData, loadingStatus, statusError} = useSelector(
    (state: RootState) => state.MemberStatus,
  );
  const [showAlert, setShowAlert] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
 
  const handleConfirm = () => {
    if (selectedMember) {
      UpdateStatus(selectedMember.trip_book_id, selectedMember.action);
      setShowAlert(false);
    }
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      let request = JSON.stringify({
        trip_id: id,
        application_status: '',
      });
      dispatch(fetchMemberList({requestBody: request}));

      return () => {};
    }, [statusData]),
  );

  const UpdateStatus = (id: any, status: any) => {
    let request = {
      trip_booking_id: id,
    };
    dispatch(
      MemberStatusChange({
        requestBody: request,
        uri:
          status == 'kickout'
            ? 'booking/kick-off-trip'
            : 'booking/waiting-list-to-onboard',
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (statusData != null) {
      if (!loadingStatus && !statusError && statusData.status) {
        showToast(statusData.message);
      } else {
        showToast(statusData.message);
      }
    }
  }, [statusData]);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      {userId === loginUserId &&
      members.find(section => section.title === 'Joined')?.data.length ? (
        <Header
          title="Trip Members"
          rightIcon={AppImages.CHAT}
          rightOnpress={() =>
            navigation.navigate(RouteNames.BroadcastScreen, {
              id: id,
              userId: userId,
            })
          }
        />
      ) : (
        <Header title="Trip Members" />
      )}
      <View marginV-20 />
      <SectionList
        sections={members}
        renderItem={({item, index, section}) => {
          return (
            <View row flex style={[styles.marshalView]}>
              <TouchableOpacity onPress={() => {
                  dispatch({type: 'SET_USER_ID', payload: item.id});
                  navigation.navigate(RouteNames.ProfileScreen);
                }}>
              <View flex>
                <Image
                  source={
                    item.image ? {uri: item.image} : AppImages.PLACEHOLDER
                  }
                  style={{
                    width: itemWidth,
                    height: '100%',
                    borderRadius: 5,
                  }}
                />
              </View>
              </TouchableOpacity>
              <View padding-10 center flex>
                <Text style={styles.name}>{item.nick_name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.email}>{item.level}</Text>
                <Text style={[styles.name, {fontSize: 10}]} marginV-5>
                  {item.trip_book.vehicle}
                </Text>
                <Text style={styles.email} marginB-5>
                  Passengers : {item.trip_book.passenger}
                </Text>
                <Text style={styles.email}>
                  Contact Info : {item.trip_book.phone}
                </Text>

                {userId === loginUserId &&
                  (section.title === 'Joined' || section.title === 'Support') &&
                  (status == 'ongoing' || status == 'upcoming') && (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedMember({
                          trip_book_id: item.trip_book.id,
                          action: 'kickout',
                        });
                        setShowAlert(true);
                      }}>
                      <View
                        style={[
                          styles.role,
                          {width: '60%', alignItems: 'center'},
                        ]}>
                        <Text style={styles.roleText}>Kick off</Text>
                      </View>
                    </TouchableOpacity>
                  )}

                {userId === loginUserId && section.title === 'Waiting list' && (status == 'ongoing' || status == 'upcoming') && (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedMember({
                        trip_book_id: item.trip_book.id,
                        action: 'onboard',
                      });
                      setShowAlert(true);
                    }}>
                    <View
                      style={[
                        styles.role,
                        {width: '60%', alignItems: 'center'},
                      ]}>
                      <Text style={styles.roleText}>Onboard</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              {selectedMember != null && (
                <CustomAlert
                  visible={showAlert}
                  message={
                    selectedMember.action === 'kickout'
                      ? 'Are you sure you want to kick off this member?'
                      : 'Are you sure you want to onboard this member?'
                  }
                  onCancel={handleCancel}
                  onConfirm={handleConfirm}
                />
              )}
            </View>
          );
        }}
        renderSectionHeader={({section}) => {
          const {title, data} = section;
          return (
            <>
            {data.length != 0 && 
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: AppFonts.BOLD,
                  color: 'white',
                }}
                marginB-10>
                Status: {title == 'Joined' ? 'Main Convey' : title}
              </Text>
              {data.length == 0 && (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: AppFonts.REGULAR,
                    color: 'red',
                  }}
                  marginB-10>
                  No Member Found
                </Text>
              )}
            </View>
            }</>
          );
        }}
      />
    </View>
  );
};
export default TripMembers;
