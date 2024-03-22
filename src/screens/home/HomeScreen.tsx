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
import {
  formattedTime,
  getDateTime,
  getUserDate,
  showToast,
} from '../../constants/commonUtils';
import BackgroundLoader from '../../components/BackgroundLoader';
import ListItem from '../../components/ListItem';

const {TextField} = Incubator;

export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

export type HomeScreenRouteProps = RouteProp<RootStackParams, 'HomeScreen'>;

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

  useFocusEffect(
    React.useCallback(() => {
      fetchList(1);

      return () => {};
    }, []),
  );

  const fetchList = (page: number) => {
    if(IsNetConnected){
    let request = JSON.stringify({
      //upcoming, ongoing, completed
      status: ['upcoming', 'ongoing'],
      // perpage: 10,
      page: page,
    });
    dispatch(fetchTripList({requestBody: request, uri: 'trip/list'}))
      .then((response: any) => {
        // Concatenate the new trips with the existing list
        setTripList(prevList => prevList.concat(response.payload.trip.data));
      })
      .catch((error: any) => {
        // Handle error
      });
    }
  };

  const filteredTrip = tripList.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const loadMoreTrips = () => {
    if (trip?.total_page && trip?.current_page < trip?.total_page) {
      const nextPage = trip.current_page + 1;
      fetchList(nextPage);
    }
  };

  return (
    <View flex backgroundColor={AppColors.Black} padding-20 paddingB-0>
      {loadingTrip && <BackgroundLoader />}
      <View row>
        <View flex>
          <Text style={styles.title}>Buckle up and get ready</Text>
        </View>

        <View center style={styles.notifView}>
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.NotificationScreen)}>
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
        marginT-15
        marginB-20
        value={search}
        onChangeText={(text: any) => setSearch(text)}
        leadingAccessory={
          <Image source={AppImages.SEARCH} width={20} height={20} marginR-10 />
        }
      />

      {!IsNetConnected && 
      <View flex center>
        <Text white text40>No Network Connection</Text>
        </View>}

      <FlatList
        data={filteredTrip}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return <ListItem item={item} index={index} navigation={navigation} />;
        }}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={loadMoreTrips}
      />
    </View>
  );
};
export default HomeScreen;
