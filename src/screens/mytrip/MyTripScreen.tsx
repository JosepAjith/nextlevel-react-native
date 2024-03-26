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
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
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
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {fetchTripList} from '../../api/trip/TriplListSlice';
import BackgroundLoader from '../../components/BackgroundLoader';
import ListItem from '../../components/ListItem';

const {TextField} = Incubator;

export type MyTripScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyTripScreen'
>;

export type MyTripScreenRouteProps = RouteProp<RootStackParams, 'MyTripScreen'>;

interface Props {
  isReplace?: any;
}

const MyTripScreen: React.FC<Props> = ({isReplace}: Props) => {
  const navigation = useNavigation<MyTripScreenNavigationProps>();
  const [search, setSearch] = useState('');
  const [tripList, setTripList] = useState([]);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {trip, loadingTrip, tripError} = useSelector(
    (state: RootState) => state.TripList,
  );
  const {type, IsNetConnected} = useSelector((state: RootState) => state.GlobalVariables);
  const {filterValue, chip} = useSelector(
    (state: RootState) => state.TripReducer,
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchList(1);
      // Clean-up function
      return () => {
        isReplace();
        setTripList([])
      };
    }, [chip,search, filterValue]),
  );

  const fetchList = (page: number) => {
    if(IsNetConnected){
      console.log(chip,'++++++++++')
    let request = JSON.stringify({
      //title
      name: search,
      //by level
      filter: filterValue === '' ? [] : [filterValue],
      //My Trips,Created,Closed
      tab_menu: chip === 1 ? 'My Trips' : chip === 2 ? 'Created' : chip === 3 ? 'Closed' : 'My Trips',
      // perpage: 10,
       page: page,
    });

    dispatch(fetchTripList({ requestBody: request, uri: 'trip/trip-by-user' }))
      .then((response: any) => {
        if (page === 1) {
          setTripList(response.payload.trip.data);
        } else {
          // Concatenate the new trips with the existing list
          setTripList(prevList => prevList.concat(response.payload.trip.data));
        }
      })
      .catch((error: any) => {
        // Handle error
      });
    }
  };

  const setChip = (value: number) => {
    dispatch({type: 'SET_CHIP', payload: value});
  };

  const loadMoreTrips = () => {
    if (trip?.total_page && trip?.current_page < trip?.total_page) {
      const nextPage = trip.current_page + 1;
      fetchList(nextPage);
    }
  };

  return (
    <View flex backgroundColor={AppColors.Black} padding-20 paddingB-0>
      <Header
        leftIcon={false}
        title="My Trips"
        rightIcon={AppImages.REFRESH}
        rightOnpress={() => {
          setSearch('')
          dispatch({type: 'SET_FILTER_VALUE', payload: ''});
          setTripList([])
          fetchList(1);
        }}
      />

      {loadingTrip && <BackgroundLoader />}

      

      <View row centerV>
        <View flex>
          <TextField
            fieldStyle={[styles.field, {width: '100%'}]}
            placeholder={'Search'}
            placeholderTextColor={'#999999'}
            style={styles.text}
            paddingH-20
            marginT-25
            marginB-20
            value={search}
            onChangeText={(text: any) => {
              setSearch(text);
            }}
            leadingAccessory={
              <Image
                source={AppImages.SEARCH}
                width={20}
                height={20}
                marginR-10
              />
            }
          />
        </View>

        <View style={{flex: 0.3}} right>
          <TouchableOpacity
            onPress={() => dispatch({type: 'IS_FILTER', payload: true})}>
            <Image source={AppImages.FILTER} width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>

      <View row marginB-20>
        <Chip
          label={'My Trips'}
          onPress={() => setChip(1)}
          labelStyle={[styles.chipLabel, chip == 1 && {color: 'black'}]}
          containerStyle={[
            styles.chip,
            chip == 1 && {backgroundColor: 'white'},
          ]}
        />
        {(type == 'Explorer' ||
          type == 'Marshal' ||
          type == 'Super Marshal') && (
          <Chip
            label={'Created Trips'}
            onPress={() => setChip(2)}
            labelStyle={[styles.chipLabel, chip == 2 && {color: 'black'}]}
            containerStyle={[
              styles.chip,
              chip == 2 && {backgroundColor: 'white'},
            ]}
          />
        )}
        <Chip
          label={'Closed Trips'}
          onPress={() => setChip(3)}
          labelStyle={[styles.chipLabel, chip == 3 && {color: 'black'}]}
          containerStyle={[
            styles.chip,
            chip == 3 && {backgroundColor: 'white'},
          ]}
        />
      </View>

      {!IsNetConnected && 
      <View flex center>
        <Text white text40>No Network Connection</Text>
        </View>}
        
      <FlatList
        data={tripList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <ListItem item={item} index={index} navigation={navigation}/>
          );
        }}
        onEndReached={loadMoreTrips}
      />
    </View>
  );
};
export default MyTripScreen;
