import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Image, Text, View} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {getDateTime, showToast} from '../../constants/commonUtils';
import moment from 'moment';
import {RouteNames} from '../../navigation';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {deleteReset, deleteTrip} from '../../api/trip/TripDeleteSlice';
import {
  changeReset,
  changeTripStatus,
} from '../../api/trip/TripStatusChangeSlice';
import {fetchMemberList} from '../../api/member/MemberListSlice';
import { AttendanceRequest } from '../../api/markAttendance/AttendanceRequest';

interface Props {
  deadline: any;
  userId: any;
  TripId: any;
  TripStatus: any;
  navigation: any;
}

const Attendance = ({
  deadline,
  userId,
  TripId,
  navigation,
  TripStatus,
}: Props) => {
  const currentDate = moment();
  const deadlineDate = moment(deadline);
  const [mark, setMark] = useState(false);
  const {loginUserId} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [AttendInput, setAttend] = useState<AttendanceRequest>(new AttendanceRequest());
  const {TripDeleteData, loadingTripDelete, TripDeleteError} = useSelector(
    (state: RootState) => state.TripDelete,
  );
  const {TripStatusChangeData, loadingChangedStatus, changedStatusError} =
    useSelector((state: RootState) => state.TripStatusChange);
  const {members, loadingMembers, membersError} = useSelector(
    (state: RootState) => state.MemberList,
  );

  const DeletingTrip = (id: any) => {
    dispatch(deleteTrip({requestBody: {id: id}}))
      .then(() => {
        dispatch(deleteReset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (TripDeleteData != null) {
      if (!loadingTripDelete && !TripDeleteError && TripDeleteData.status) {
        showToast(TripDeleteData.message);
        navigation.goBack();
      } else {
        showToast(TripDeleteData.message);
      }
    }
  }, [TripDeleteData]);

  const ClosingTrip = (id: any) => {
    dispatch(changeTripStatus({requestBody: {id: id, trip_status: 'expired'}}))
      .then(() => {
        dispatch(changeReset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (TripStatusChangeData != null) {
      if (
        !loadingChangedStatus &&
        !changedStatusError &&
        TripStatusChangeData.status
      ) {
        showToast(TripStatusChangeData.message);
        navigation.goBack();
      } else {
        showToast(TripStatusChangeData.message);
      }
    }
  }, [TripStatusChangeData]);

  const AttendanceList = () => {
    let request = JSON.stringify({
      trip_id: TripId,
      application_status: '',
    });
    dispatch(fetchMemberList({requestBody: request}));
  };

  const MarkingAttendance = (userid: number, tripid: number, isPresent: number) => {
    setAttend(prevAttendInput => ({
      ...prevAttendInput,
      data: [...prevAttendInput.data, ],
    }));
  };

  return (
    <>
      {currentDate.isAfter(deadlineDate) && (
        <View style={styles.deadline} marginB-10>
          <View row center marginH-20>
            <Image
              source={AppImages.DEADLINE}
              width={24}
              height={24}
              marginR-10
            />
            <Text style={styles.text2}>
              "Deadline over you can't join the trip"
            </Text>
          </View>
        </View>
      )}
      {TripStatus == 'expired' && (
        <View style={styles.deadline} marginB-10>
          <View row center marginH-20>
            <Image
              source={AppImages.DEADLINE}
              width={24}
              height={24}
              marginR-10
            />
            <Text style={styles.text2}>Trip Closed</Text>
          </View>
        </View>
      )}
      {userId == loginUserId && TripStatus != 'expired' && (
        <View style={styles.deadline}>
          <View row marginH-15>
            <TouchableOpacity
              style={[styles.smallView, {backgroundColor: '#00A1FC'}]}
              onPress={() =>
                navigation.navigate(RouteNames.AddTripScreen, {
                  id: TripId,
                })
              }>
              <Image
                source={AppImages.UPDATE}
                width={24}
                height={24}
                marginR-5
              />
              <Text style={styles.text2}>Edit Trip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.smallView, {backgroundColor: '#FF6565'}]}
              onPress={() => {
                ClosingTrip(TripId);
              }}>
              <Image
                source={AppImages.CANCEL}
                width={18}
                height={18}
                marginR-5
              />
              <Text style={styles.text2}>Close Trip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.smallView, {backgroundColor: '#FA2D2D'}]}
              onPress={() => {
                DeletingTrip(TripId);
              }}>
              <Image
                source={AppImages.CANCEL}
                width={18}
                height={18}
                marginR-5
              />
              <Text style={styles.text2}>Cancel Trip</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View row centerV marginH-20>
            <View flex left>
              <Text style={styles.text2}>Attendance List</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                AttendanceList();
                setMark(!mark);
              }}
              style={styles.attdView}>
              <Text style={styles.text2}>Mark Attendance</Text>
            </TouchableOpacity>
          </View>

          {mark && (
            <View marginH-20 marginT-10>
             {members.map((group) => {
      if (group.title === "Support") {
        if (group.data.length > 0) {
          return group.data.map((member, index) => (
            <Checkbox
              key={index}
              label={member.name}
              labelStyle={styles.text2}
              color="white"
              style={{borderRadius: 2}}
              containerStyle={{marginBottom: 20}}
              value={member.is_present}
              onValueChange={(newValue) => MarkingAttendance(member.id, TripId, newValue ? 1 : 0)}
            />
          ));
        } else {
          return <Text center style={styles.text2}>No members joined.</Text>;
        }
      } else {
        return null; 
      }
    })}
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Attendance;
