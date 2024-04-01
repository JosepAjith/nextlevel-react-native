import React, {useState} from 'react';
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

  useFocusEffect(
    React.useCallback(() => {
      let request = JSON.stringify({
        trip_id: id,
        application_status: '',
      });
      dispatch(fetchMemberList({requestBody: request}));

      return () => {};
    }, []),
  );

  const UpdateStatus = (id: any, status: any) => {
    let request = {
      trip_booking_id: id,
    };
    dispatch(
      MemberStatusChange({
        requestBody: request,
        uri: status == 'kickout' ? 'booking/kick-off-trip' : 'booking/waiting-list-to-onboard',
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

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
              <View padding-10 center flex>
                <Text style={styles.name}>{item.name}</Text>
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
                  section.title === 'Joined' &&
                  status == 'ongoing' && (
                    <TouchableOpacity
                      onPress={() => UpdateStatus(item.trip_book.id,'kickout')}>
                      <View
                        style={[
                          styles.role,
                          {width: '60%', alignItems: 'center'},
                        ]}>
                        <Text style={styles.roleText}>Kick out</Text>
                      </View>
                    </TouchableOpacity>
                  )}

                {userId === loginUserId && section.title === 'Waiting list' && (
                    <TouchableOpacity
                    onPress={() => UpdateStatus(item.trip_book.id,'onboard')}>
                  <View  style={[
                    styles.role,
                    {width: '60%', alignItems: 'center'},
                  ]}>
                    <Text style={styles.roleText}>Onboard</Text>
                  </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
        renderSectionHeader={({section}) => {
          const {title, data} = section;
          return (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: AppFonts.BOLD,
                  color: 'white',
                }}
                marginB-10>
                Status: {title}
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
          );
        }}
      />
    </View>
  );
};
export default TripMembers;
