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
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {reset, sendNotif} from '../../api/notification/SendNotificationSlice';
import {getDayTime, showToast} from '../../constants/commonUtils';
import {send} from 'process';
import BackgroundLoader from '../../components/BackgroundLoader';
import {fetchNotifications} from '../../api/notification/GetNotificationSlice';

const {TextField} = Incubator;

export type BroadcastScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'BroadcastScreen'
>;

export type BroadcastScreenRouteProps = RouteProp<
  RootStackParams,
  'BroadcastScreen'
>;

interface Props {}

const BroadcastScreen: React.FC<Props> = ({route}: any) => {
  const navigation = useNavigation<BroadcastScreenNavigationProps>();
  const id = route.params.id;
  const userId = route.params.userId;
  const [message, setMsg] = useState('');
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {NotifSendData, loadingSendNotif, NotifSendError} = useSelector(
    (state: RootState) => state.SendNotification,
  );
  const {notification} = useSelector(
    (state: RootState) => state.GetNotification,
  );
  const {loginUserId} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  useFocusEffect(
    React.useCallback(() => {
      getMessages(1);

      return () => {};
    }, []),
  );

  const getMessages = (page : number) => {
    dispatch(
      fetchNotifications({
        requestBody: {trip_id: id, perpage:10,
        page:page,},
        uri: 'notification/message-show-from',
      }),
    );
  };

  const loadMoreMessages = () => {
    if (notification?.total_page && notification?.total_count) {
        const nextPage = notification.total_page + 1;
        if (nextPage <= notification.total_page) {
          getMessages(nextPage);
        }
      }
  };

  const Send = async () => {
    let request = {
      trip_id: id,
      message: message,
    };
    dispatch(sendNotif({requestBody: request}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (NotifSendData != null) {
      if (!loadingSendNotif && !NotifSendError && NotifSendData.status) {
        showToast(NotifSendData.message);
        setMsg('')
        getMessages(1)
      } else {
        showToast(NotifSendData.message);
      }
    }
  }, [NotifSendData]);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="BroadCast" rightIcon={AppImages.REFRESH} />

      <View flex backgroundColor="#1B1E1D" style={styles.card}>
        <View flex>
          <FlatList
            data={notification?.data}
            inverted
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View row marginB-20>
                  <Image
                    source={AppImages.USER2}
                    width={32}
                    height={32}
                    style={{borderRadius: 16, marginTop: 20}}
                  />
                  <View flex right marginL-10>
                    <Text style={styles.time}>{getDayTime(item.created_at)}</Text>
                    <View style={styles.msgView} marginT-5>
                      <Text style={styles.message}>{item.content}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
            onStartReached={loadMoreMessages}
          />
        </View>

{userId == loginUserId &&
        <View row marginV-20>
          <View flex marginR-10>
            <TextField
              placeholder={'Type your broadcast message'}
              placeholderTextColor={'#72777A'}
              fieldStyle={styles.typeView}
              style={styles.time}
              value={message}
              onChangeText={text => setMsg(text)}
              onSubmitEditing={Send}
            />
          </View>

          <View style={styles.sendView} center>
            <TouchableOpacity onPress={Send}>
              <Image source={AppImages.BROADCAST} width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
}
      </View>
    </View>
  );
};
export default BroadcastScreen;
