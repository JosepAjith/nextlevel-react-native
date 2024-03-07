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

const {TextField} = Incubator;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export type MyTripScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyTripScreen'
>;

export type MyTripScreenRouteProps = RouteProp<RootStackParams, 'MyTripScreen'>;

interface Props {
  isReplace?: any;
}

const MyTripScreen: React.FC<Props> = ({isReplace}:Props) => {
  const navigation = useNavigation<MyTripScreenNavigationProps>();
  const [search, setSearch] = useState('');
  const [expandedItems, setExpandedItems] = useState([]);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {trip, loadingTrip, tripError} = useSelector(
    (state: RootState) => state.TripList,
  );
  const {type} = useSelector((state: RootState) => state.GlobalVariables);
  const {filterValue,chip} = useSelector((state: RootState) => state.TripReducer);
console.log(chip)
  useFocusEffect(
    React.useCallback(() => {
      let request = JSON.stringify({
          //title
        name: search,
          //by level
        filter: filterValue === '' ? [] : [filterValue],
         //My Trips,Created,Closed
        tab_menu: chip === 2 ? 'Created' : chip === 3 ? 'Closed' : 'My Trips'
      });
      
      dispatch(fetchTripList({ requestBody: request, uri: 'trip/trip-by-user' }));

      // Clean-up function
      return () => {
        isReplace()
      };
    }, [chip, search, filterValue]) 
  );

const setChip = (value: number) => {
  dispatch({ type: 'SET_CHIP', payload: value });
}

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

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header leftIcon={false} title="My Trips" rightIcon={AppImages.REFRESH} />

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
            onChangeText={(text: any) => {setSearch(text)}}
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

      <FlatList
        data={trip}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(RouteNames.TripDetails, {id: item.id})
              }>
              <View style={styles.view}>
                <ImageBackground
                  source={
                    item.trip_images.length != 0 &&
                    item.trip_images[0].image != ''
                      ? {uri: item.trip_images[0].image}
                      : AppImages.HOME1
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
                    <Image source={AppImages.SHARE} width={30} height={30} />
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
                      <Text style={styles.statusText}>
                        {item.trip_status}
                      </Text>
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
                      <Text style={styles.leftText}>{item.start_time}</Text>
                    </View>

                    <View row marginB-10>
                      <Text style={styles.rightText}>Trip Date</Text>
                      <Text style={styles.leftText}>
                        {item.joining_start_date}
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
                        {item.joining_deadline}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default MyTripScreen;
