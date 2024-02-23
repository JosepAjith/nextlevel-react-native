import React, { useState } from 'react';
import HomeScreen from '../home/HomeScreen';
import MyTripScreen from '../mytrip/MyTripScreen';
import AddTripScreen from '../addtrip/AddTripScreen';
import ProfileScreen from '../profile/ProfileScreen';
import AppImages from '../../constants/AppImages';
import { TouchableOpacity } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import AppColors from '../../constants/AppColors';

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderTab = (tabName, iconName) => (
    <TouchableOpacity
      key={tabName}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}
      onPress={() => setActiveTab(tabName)}
    >
      <Image
        source={iconName}
        style={{ width: 24, height: 24, tintColor: activeTab === tabName ? AppColors.Orange : 'white' }}
      />
      <Text style={{ color: activeTab === tabName ? AppColors.Orange : 'white' }}>{tabName}</Text>
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
    <View style={{ flex: 1 }} backgroundColor={AppColors.Black}>
        {renderScreen()}
      <View style={{ flexDirection: 'row', height: 80,borderTopLeftRadius: 34,borderTopRightRadius: 34,overflow:'hidden'}} backgroundColor='blue'>
        {renderTab('Home', AppImages.HOME)}
        {renderTab('My Trips', AppImages.JEEP)}
        {renderTab('Add Trip', AppImages.ADDTRIP)}
        {renderTab('Profile', AppImages.PROFILE)}
      </View>
    </View>
  );
};

export default BottomTabs;
