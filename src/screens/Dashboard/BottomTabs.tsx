import React, {useCallback, useEffect, useState} from 'react';
import HomeScreen from '../home/HomeScreen';
import MyTripScreen from '../mytrip/MyTripScreen';
import AddTripScreen from '../addtrip/AddTripScreen';
import ProfileScreen from '../profile/ProfileScreen';
import AppImages from '../../constants/AppImages';
import {
  BackHandler,
  ImageSourcePropType,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import TripFilter from '../mytrip/TripFilter';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {fetchProfileDetails} from '../../api/profile/ProfileDetailsSlice';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit/react';
import {RouteNames} from '../../navigation';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const BottomTabs = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');
  const {openFilter, filterValue} = useSelector(
    (state: RootState) => state.TripReducer,
  );
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {type} = useSelector((state: RootState) => state.GlobalVariables);
  const [replace, setReplace] = useState(false);
  useEffect(() => {
    if (replace) {
      setActiveTab('My Trips');
    }
  }, [replace]);

  useEffect(() => {
    const backHandler = () => {
      if (replace) {
        setActiveTab('Profile');
        return true;
      }
      return false;
    };

    // Add event listener for hardware back button press
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
  }, [replace]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProfileDetails({requestBody: ''}));
      dispatch({type: 'SET_FILTER_VALUE', payload: ''});
      dispatch({type: 'SET_CHIP', payload: 1});
      dispatch({type: 'SET_USER_ID', payload: 0});
    }, [dispatch]),
  );

  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem(AppStrings.LOGIN_USER_ID);
      const type = await dispatch(fetchProfileDetails({requestBody: ''}));
      const types = await AsyncStorage.getItem(AppStrings.TYPE);
        if (fetchProfileDetails.fulfilled.match(type)) {
        dispatch({type: 'SET_TYPE', payload: type.payload.profileDetails.user.level});
      }
      else{
        dispatch({type: 'SET_TYPE', payload: types});
      }
      if (id !== null) {
        dispatch({type: 'SET_LOGIN_USER_ID', payload: Number(id)});
      }
    };
    fetchData();
  }, []);

  const FilterClose = () => {
    dispatch({type: 'IS_FILTER', payload: false});
  };

  const renderTab = (tabName: string, iconName: any) => (
    <TouchableOpacity
      key={tabName}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      onPress={() => {
        setActiveTab(tabName);
      }}>
      <View
        center
        backgroundColor={
          activeTab === tabName ? 'rgba(253,217,178,0.1)' : 'transparent'
        }
        flex
        marginT-10
        style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, width: 70}}>
        <Image
          source={iconName}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: activeTab === tabName ? AppColors.Orange : 'white',
          }}
        />
        <Text
          style={[
            styles.text,
            {color: activeTab === tabName ? AppColors.Orange : 'white'},
          ]}>
          {tabName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderScreen = () => {
    switch (activeTab) {
      case 'My Trips':
        return <MyTripScreen isReplace={() => setReplace(false)} />;
      case 'Add Trip':
        return <AddTripScreen id={0} initial={() => setActiveTab('Home')} />;
      case 'Profile':
        return <ProfileScreen isReplace={() => setReplace(true)} />;
      case 'Home':
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={{flex: 1}} backgroundColor={AppColors.Black}>
      {renderScreen()}
      <View style={styles.tabBar} backgroundColor={AppColors.Black}>
        {renderTab('Home', AppImages.HOME)}
        {renderTab('My Trips', AppImages.JEEP)}
        {(type == 'Explorer' || type == 'Marshal' || type == 'Super Marshal') &&
          renderTab('Add Trip', AppImages.ADDTRIP)}
        {renderTab('Profile', AppImages.PROFILE)}
      </View>
      {openFilter && <TripFilter close={FilterClose} selected={filterValue}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: AppFonts.REGULAR,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  tabBar: {
    flexDirection: 'row',
    height: 80,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: 'hidden',
    shadowColor: 'rgba(255, 255, 255, 1)', // Pure white with some opacity
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1, // Adjust the opacity as needed
    shadowRadius: 5,
    elevation: 30,
  },
});

export default BottomTabs;
