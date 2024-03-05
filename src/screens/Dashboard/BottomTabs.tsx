import React, {useEffect, useState} from 'react';
import HomeScreen from '../home/HomeScreen';
import MyTripScreen from '../mytrip/MyTripScreen';
import AddTripScreen from '../addtrip/AddTripScreen';
import ProfileScreen from '../profile/ProfileScreen';
import AppImages from '../../constants/AppImages';
import {
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

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const {openFilter} = useSelector((state: RootState) => state.TripReducer);
  const dispatch = useDispatch();
  const {type} = useSelector((state: RootState) => state.GlobalVariables);

  useEffect(() => {
    fetchAsyncValue();
  }, []);

  const fetchAsyncValue = async () => {
    const type = await AsyncStorage.getItem(AppStrings.TYPE);
    if (type != null) {
      dispatch({
        type: 'SET_TYPE',
        payload: type,
      });
    }
  };

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
        return <MyTripScreen />;
      case 'Add Trip':
        return <AddTripScreen />;
      case 'Profile':
        return <ProfileScreen />;
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
        {(type == 'Explorer' || type == 'Marshal' || type == 'Super Marshal') && renderTab('Add Trip', AppImages.ADDTRIP)}
        {renderTab('Profile', AppImages.PROFILE)}
      </View>
      {openFilter && <TripFilter close={FilterClose} />}
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
    shadowColor: 'rgba(255, 255, 255, 0.4)', // Pure white with some opacity
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1, // Adjust the opacity as needed
    shadowRadius: 5,
    elevation: 20,
  },
});

export default BottomTabs;
