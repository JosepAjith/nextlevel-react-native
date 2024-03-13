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
import {
  Animated,
  Easing,
  FlatList,
  ImageBackground,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTripList} from '../../api/trip/TriplListSlice';
import { formattedTime, getDateTime, getUserDate } from '../../constants/commonUtils';
import BackgroundLoader from '../../components/BackgroundLoader';

const {TextField} = Incubator;

export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export type HomeScreenRouteProps = RouteProp<RootStackParams, 'HomeScreen'>;

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const [expandedItems, setExpandedItems] = useState([]);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {trip, loadingTrip, tripError} = useSelector(
    (state: RootState) => state.TripList,
  );
  const [search, setSearch] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      let request = JSON.stringify({
        //upcoming, ongoing, completed
        status: ['upcoming', 'ongoing'],
      });
      dispatch(fetchTripList({requestBody: request, uri: 'trip/list'}));

      return () => {
        
      };
    }, []),
  );

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

  const filteredTrip = trip?.data.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase())
);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>

      {loadingTrip && <BackgroundLoader/>}
      <View row>
        <View flex>
          <Text style={styles.title}>Buckle up and get ready</Text>
        </View>

        <View center style={styles.notifView}>
          <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.NotificationScreen)}>
          <Image source={AppImages.NOTIF} width={18} height={21} />
          {/* <View style={{position:'absolute', right:13, top:12 }}>
          <Image source={AppImages.DOT} width={8} height={8}/>
          </View> */}
          </TouchableOpacity>
        </View>
      </View>

      <TextField
        fieldStyle={styles.field}
        placeholder={'Search'}
        placeholderTextColor={'#999999'}
        style={styles.text}
        paddingH-20
        marginT-25
        marginB-20
        value={search}
        onChangeText={(text:any) => setSearch(text)}
        leadingAccessory={
          <Image source={AppImages.SEARCH} width={20} height={20} marginR-10 />
        }
      />

      <FlatList
        data={filteredTrip}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteNames.TripDetails,{id:item.id})}>
              <View style={styles.view}>
                <ImageBackground
                  source={
                    item.trip_images.length != 0 &&
                    item.trip_images[0].image != ''
                      ? {uri: item.trip_images[0].image}
                     : AppImages.NOIMAGE
                  }
                  // source={AppImages.HOME1}
                  style={{width: '100%', height: 150}}
                  imageStyle={{
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <View row margin-20>
                    <Text style={styles.viewText}>{item.title}</Text>
                    <View flex right>
                      <Text style={styles.date}>{item.date}</Text>
                      <Text style={styles.date}>{item.start_time}</Text>
                    </View>
                  </View>

                  <View flex right centerV margin-20>
                    {/* <Image source={AppImages.SHARE} width={30} height={30} /> */}
                  </View>

                  <TouchableOpacity
                    style={styles.arrow}
                    onPress={() => toggleExpand(index)}>
                    <Animated.Image
                      source={
                        expandedItems[index] ? AppImages.UP : AppImages.DOWN
                      }
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
                <View row padding-15>
                  <View row left centerV flex>
                    <Text style={styles.text1}>{item.level}</Text>
                    <View></View>
                  </View>

                  <View row flex center>
                    <Text style={styles.text1}>Capacity</Text>
                    <View style={styles.capView}>
                      <Text style={styles.capty}>
                        {item.trip_book_count}/{item.capacity}
                      </Text>
                    </View>
                  </View>

                  <View row right flex centerV>
                    <Text style={styles.text1}>Status</Text>
                    <View style={styles.statusView}>
                      <Text style={styles.statusText}>{item.trip_status}</Text>
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
                      <Text style={styles.leftText}>{formattedTime(item.meeting_time)}</Text>
                    </View>

                    <View row marginB-10>
                      <Text style={styles.rightText}>Trip Date</Text>
                      <Text style={styles.leftText}>
                        {getUserDate(item.date)}
                      </Text>
                    </View>

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
        }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  );
};
export default HomeScreen;
