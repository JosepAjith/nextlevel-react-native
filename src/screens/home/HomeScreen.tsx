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
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTripList} from '../../api/trip/TriplListSlice';
import BackgroundLoader from '../../components/BackgroundLoader';
import ListItem from '../../components/ListItem';

const {TextField} = Incubator;

export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

export type HomeScreenRouteProps = RouteProp<RootStackParams, 'HomeScreen'>;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [tripList, setTripList] = useState([]);
  const {trip, loadingTrip, tripError} = useSelector(
    (state: RootState) => state.TripList,
  );
  const [search, setSearch] = useState('');
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );
  const [scrollY] = useState(new Animated.Value(0));
  const [headerVisible, setHeaderVisible] = useState(true);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  useEffect(() => {
    scrollY.addListener(({value}) => {
      if (value > 0) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHeaderVisible(false);
      } else {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHeaderVisible(true);
      }
    });

    return () => {
      scrollY.removeAllListeners();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchList(1);

      return () => {
        setTripList([]);
      };
    }, [search]),
  );

  const fetchList = (page: number) => {
    if (IsNetConnected) {
      let request = JSON.stringify({
        //upcoming, ongoing, completed
        status: ['upcoming', 'ongoing'],
        title: search,
        // perpage: 10,
        page: page,
      });
      dispatch(fetchTripList({requestBody: request, uri: 'trip/list'}))
        .then((response: any) => {
          if (page === 1) {
            setTripList(response.payload.trip.data);
          } else {
            // Concatenate the new trips with the existing list
            setTripList(prevList =>
              prevList.concat(response.payload.trip.data),
            );
          }
        })
        .catch((error: any) => {
          // Handle error
        });
    }
  };

  const loadMoreTrips = () => {
    if (trip?.total_page && trip?.current_page < trip?.total_page) {
      const nextPage = trip.current_page + 1;
      fetchList(nextPage);
    }
  };

  return (
    <View flex backgroundColor={AppColors.Black} padding-20 paddingB-0>
      {loadingTrip && <BackgroundLoader />}

      {headerVisible && (
        <View row>
              <View style={{flex:0.25}} centerV>
            <Image source={AppImages.CLOGO} width={50} height={50}/>
          </View>
          <View flex marginH-5 centerV>
            <Text style={styles.title}>NXT LEVEL 4x4</Text>
            <Text style={styles.sub}>Desert wanderlust, never ending</Text>
          </View>

          <View  center style={styles.notifView}>
            {/* <View absT absR>
          <Image source={AppImages.DOT} width={10} height={10}/>
          </View> */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(RouteNames.NotificationScreen)
              }>
              <Image source={AppImages.NOTIF} width={18} height={21} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TextField
        fieldStyle={styles.field}
        placeholder={'Search'}
        placeholderTextColor={'#999999'}
        style={styles.text}
        paddingH-20
        marginT-15
        marginB-20
        value={search}
        onChangeText={(text: any) => setSearch(text)}
        leadingAccessory={
          <Image source={AppImages.SEARCH} width={20} height={20} marginR-10 />
        }
      />

      {!IsNetConnected && (
        <View flex center>
          <Text white text40>
            No Network Connection
          </Text>
        </View>
      )}
      {tripList.length != 0 ? (
        <Animated.FlatList
          data={tripList}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <ListItem item={item} index={index} navigation={navigation} />
            );
          }}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMoreTrips}
          onScroll={handleScroll}
        />
      ) : (
        <View flex center>
          <Text white text40>
            No trips found.
          </Text>
        </View>
      )}
    </View>
  );
};
export default HomeScreen;
