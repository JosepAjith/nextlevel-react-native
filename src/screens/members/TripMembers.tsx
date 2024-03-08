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
import {
  Dimensions,
  SectionList,
} from 'react-native';
import {Header} from '../../components/Header';
import {styles} from '../mytrip/styles';
import TripFilter from '../mytrip/TripFilter';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { fetchMemberList } from '../../api/member/MemberListSlice';
import AppFonts from '../../constants/AppFonts';

const {TextField} = Incubator;

export type TripMembersNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'TripMembers'
>;

export type TripMembersRouteProps = RouteProp<RootStackParams, 'TripMembers'>;

interface Props {}
const TripMembers: React.FC<Props> = ({route}:any) => {
  const navigation = useNavigation<TripMembersNavigationProps>();
  const id = route.params.id;
  const userId = route.params.userId;
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {members, loadingMembers, membersError} = useSelector(
    (state: RootState) => state.MemberList,
  );
  const {loginUserId} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  useFocusEffect(
    React.useCallback(() => {
      let request = JSON.stringify({
        trip_id:id,
        application_status:"",
      });
      dispatch(fetchMemberList({requestBody: request}));

      return () => {};
    }, []),
  );

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      {userId == loginUserId ?
      <Header title="Trip Members" rightIcon={AppImages.CHAT} />
      :
      <Header title="Trip Members" rightIcon={AppImages.REFRESH} />
}
<View marginV-20/>
      <SectionList
      sections={members}
        renderItem={({item, index}) => {

          return (
              <View row flex style={[styles.marshalView]}>
                <View>
                <Image
                  source={AppImages.USER2}
                  style={{
                    width: itemWidth,
                    height: 130,
                    borderRadius: 5,
                  }}
                />
                </View>
                <View padding-10 center flex>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                  <Text style={styles.email}>{item.level}</Text>
                  <Text style={[styles.name,{fontSize:10}]} marginV-5>{item.trip_book.vehicle}</Text>
                  <Text style={styles.email} marginB-5>Passengers : {item.trip_book.passenger}</Text>
                  <Text style={styles.email}>Contact Info : {item.trip_book.phone}</Text>

                  {/* <View style={styles.role}>
                    <Text style={styles.roleText}>View Ride</Text>
                    </View> */}
                </View>
              </View>
          );
        }}
        renderSectionHeader={({ section }) => {
          const { title, data } = section;
          return (
            <View>
            <Text style={{ fontSize: 16, fontFamily: AppFonts.BOLD, color: 'white' }} marginB-10>
              Status: {title}
            </Text>
            {data.length == 0 && <Text style={{ fontSize: 14, fontFamily: AppFonts.REGULAR, color: 'red' }} marginB-10>No Member Found</Text>}
            </View>
          );
        }}
    />
  
      
    </View>
  );
};
export default TripMembers;
