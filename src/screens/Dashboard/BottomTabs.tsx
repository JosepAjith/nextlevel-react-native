import React, {useState} from 'react';
import HomeScreen from '../home/HomeScreen';
import MyTripScreen from '../mytrip/MyTripScreen';
import AddTripScreen from '../addtrip/AddTripScreen';
import ProfileScreen from '../profile/ProfileScreen';
import AppImages from '../../constants/AppImages';
import {ImageSourcePropType, StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';
import TripFilter from '../mytrip/TripFilter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const {openFilter} = useSelector(
    (state: RootState) => state.TripReducer,
  );
  const dispatch = useDispatch();

  const FilterClose = () => {
    dispatch({type: 'IS_FILTER', payload: false});
  };

  const renderTab = (tabName: string, iconName: any) => (
    <TouchableOpacity
      key={tabName}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      onPress={() => setActiveTab(tabName)}>
      <View center>
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
      <View
        style={styles.tabBar}
        backgroundColor={AppColors.Black}>
        {renderTab('Home', AppImages.HOME)}
        {renderTab('My Trips', AppImages.JEEP)}
        {renderTab('Add Trip', AppImages.ADDTRIP)}
        {renderTab('Profile', AppImages.PROFILE)}
      </View>
      {openFilter && <TripFilter close={FilterClose}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: AppFonts.REGULAR,
    fontSize: 14,
    textAlign: 'center',
    marginTop:10
  },
  tabBar:{
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
  }
  
});

export default BottomTabs;
