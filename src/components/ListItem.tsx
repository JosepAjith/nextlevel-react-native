import React, {useEffect, useState} from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import AppStyles from '../constants/AppStyles';
import {
  Animated,
  Easing,
  ImageBackground,
  LayoutAnimation,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {
  formattedTime,
  getDateTime,
  getUserDate,
} from '../constants/commonUtils';
import {RouteNames} from '../navigation';
import {styles} from '../screens/home/styles';
import AppImages from '../constants/AppImages';
import {useDispatch} from 'react-redux';
import Share from 'react-native-share';
import {reset, urlShare} from '../api/share/ShareUrlSlice';
import {RootState} from '../../store';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import LevelView from './LevelView';

interface Props {
  item: any;
  index: any;
  navigation: any;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ListItem = ({item, index, navigation}: Props) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [arrowRotation, setArrowRotation] = useState(new Animated.Value(0));

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });

    Animated.timing(arrowRotation, {
      toValue: expandedItems.includes(index) ? 1 : 0,
      duration: 300, // Adjust duration as needed
      easing: Easing.circle,
      useNativeDriver: true, // Set to true if possible, it improves performance
    }).start();
  };

  const shareUrl = async (url: any) => {
    //  const deepLink = 'com.bnbcnxtlevel.app://next-level.prompttechdemohosting.com';
    const shareOptions = {
      title: 'Share file',
      message: 'Join here ==>',
      url: url,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      dispatch(
        urlShare({
          requestBody: {url: url},
        }),
      )
        .then(() => {
          dispatch(reset());
        })
        .catch((err: any) => console.log(err));
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch({type: 'SET_CHIP', payload: 1});
        navigation.navigate(RouteNames.TripDetails, {
          id: item.id,
          isDeepLink: false,
        });
      }}>
      <View style={styles.view}>
        <ImageBackground
          source={
            item.trip_images.length != 0 && item.trip_images[0].image != ''
              ? {uri: item.trip_images[0].image}
              : AppImages.NOIMAGE
          }
          // source={AppImages.HOME1}
          style={{width: '100%', height: 150}}
          imageStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
            <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
          <View row margin-20>
            <Text style={styles.viewText}>{item.title}</Text>
            <View flex right>
              <Text style={styles.date}>{getUserDate(item.date)}</Text>
              <Text style={styles.date}>{formattedTime(item.start_time)}</Text>
            </View>
          </View>

          <View flex right centerV margin-20>
            <TouchableOpacity onPress={() => shareUrl(item.share_url)}>
              <Image source={AppImages.SHARE} width={30} height={30} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.arrow}
            onPress={() => toggleExpand(index)}>
            <Animated.Image
              source={expandedItems[index] ? AppImages.UP : AppImages.DOWN}
              style={{
                transform: [
                  {
                    rotate: arrowRotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View row padding-15 style={{justifyContent:'space-between'}}>
          <View centerH>
            <Text style={styles.text1}>{item.level}</Text>
            <LevelView level={item.level} />
          </View>

          <View centerH>
            <Text style={styles.text1}>Capacity</Text>
            <View style={styles.capView} center>
              <Text style={styles.capty}>
                {item.trip_book_joined_count}{' '}/{' '}{item.capacity}
              </Text>
            </View>
          </View>

          <View centerH>
            <Text style={styles.text1}>Support</Text>
            <View style={[styles.capView]} center>
              <Text style={styles.capty}>
                {item.trip_book_support_count}
              </Text>
            </View>
          </View>

          <View centerH>
            <Text style={styles.text1}>Status</Text>
            <View center
              style={styles.statusView}
              backgroundColor={
                item.trip_status == 'completed'
                  ? '#BBFD79'
                  : item.trip_status == 'ongoing'
                  ? 'orange'
                  : item.trip_status == 'upcoming'
                  ? 'yellow'
                  : item.trip_status == 'cancelled'
                  ? 'red'
                  : '#BBFD79'
              }>
              <Text style={styles.statusText}>{item.trip_status == 'completed' ? 'closed' : item.trip_status}</Text>
            </View>
          </View>
        </View>
        {expandedItems[index] && (
          <View style={styles.bottomView}>
            <View row marginB-10>
              <Text style={styles.rightText}>Organizer</Text>
              <Text style={styles.leftText}>{item.user.name}</Text>
            </View>

            <View row marginB-10>
              <Text style={styles.rightText}>Meeting Time</Text>
              <Text style={styles.leftText}>
                {formattedTime(item.meeting_time)}
              </Text>
            </View>

            <View row marginB-10>
              <Text style={styles.rightText}>Trip Date</Text>
              <Text style={styles.leftText}>{getUserDate(item.date)}</Text>
            </View>

            {/* <View row marginB-10>
              <Text style={styles.rightText}>Total Support Count</Text>
              <Text style={styles.leftText}>
                {item.trip_book_support_count}
              </Text>
            </View> */}

            <View row marginB-10>
              <Text style={styles.rightText}>City</Text>
              <Text style={styles.leftText}>{item.city}</Text>
            </View>

            <View row marginB-10>
              <Text style={styles.rightText}>Area</Text>
              <Text style={styles.leftText}>{item.area_details}</Text>
            </View>

            <View row marginB-10>
              <Text style={styles.rightText}>Joining deadline</Text>
              <Text style={styles.leftText}>
                {getDateTime(item.joining_deadline)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
