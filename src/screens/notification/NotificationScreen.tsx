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
import {FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import AppImages from '../../constants/AppImages';
import {styles} from './styles';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchNotifications} from '../../api/notification/GetNotificationSlice';
import {getDateTime, showToast} from '../../constants/commonUtils';
import {
  deleteNotif,
  reset,
} from '../../api/notification/DeleteNotificationSlice';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

export type NotificationScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'NotificationScreen'
>;

export type NotificationScreenRouteProps = RouteProp<
  RootStackParams,
  'NotificationScreen'
>;

interface Props {}

const NotificationScreen: React.FC<Props> = () => {
  const navigation = useNavigation<NotificationScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {notification, loadingNotifications} = useSelector(
    (state: RootState) => state.GetNotification,
  );
  const {NotifDeleteData, loadingDeleteNotif, NotifDeleteError} = useSelector(
    (state: RootState) => state.DeleteNotification,
  );

  useEffect(()=>{
      NotifList();
    }, [])

  const NotifList = () => {
    dispatch(
      fetchNotifications({
        requestBody: '',
        uri: 'notification/get-notification',
      }),
    );
  };


  const Delete = async (id: number) => {
    let request = {
      id: id,
    };
    dispatch(deleteNotif({requestBody: request})).catch((err: any) =>
      console.log(err),
    );
  };

  useEffect(() => {
    
    if (NotifDeleteData != null) {
      if (!loadingDeleteNotif && !NotifDeleteError && NotifDeleteData.status) {
        dispatch(
          fetchNotifications({
            requestBody: '',
            uri: 'notification/get-notification',
          }),
        );
        dispatch(reset());
        showToast(NotifDeleteData.message);
      } else {
        showToast(NotifDeleteData.message);
      }
    }
  }, [NotifDeleteData]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View flex backgroundColor={AppColors.Black} padding-20>
        <Header title="Notifications" rightIcon={AppImages.REFRESH} rightOnpress={NotifList}/>
        {loadingNotifications && <BackgroundLoader />}

        {notification?.data.length == 0 ? (
          <View flex center>
            <Image source={AppImages.NONOTIF} width={58} height={58} />
            <Text style={styles.text} marginT-20>
              No Notifications
            </Text>
            <Text style={styles.text1} marginT-10>
              We’ll let you know when there will be something to update you.
            </Text>
          </View>
        ) : (
          <FlatList
            data={notification?.data}
            style={{marginTop: 30}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <Swipeable
                  // onActivated={() => Delete(item.id)}
                  renderRightActions={() => (
                    <TouchableOpacity
                      onPress={() => Delete(item.id)}
                      style={{
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        padding: 20,
                        marginBottom: 20,
                      }}>
                      <Image source={AppImages.REMOVE} />
                    </TouchableOpacity>
                  )}>
                    <TouchableOpacity onPress={()=>{if(item.trip_id){
                      navigation.navigate(RouteNames.TripDetails, {
                        id: item.trip_id
                      });
                    }}}>
                  <View row style={styles.notiFView}>
                    <Image
                      source={AppImages.PLACEHOLDER}
                      width={32}
                      height={32}
                      style={{borderRadius: 16}}
                    />
                    <View marginL-10 width={'90%'}>
                      <Text style={styles.notifText}>{item.message}</Text>
                      <View right>
                      <Text style={styles.notifText1}>{getDateTime(item.created_at)}</Text>
                      </View>
                    </View>
                  </View>
                  </TouchableOpacity>
                </Swipeable>
              );
            }}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};
export default NotificationScreen;
