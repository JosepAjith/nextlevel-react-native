// import React, {useEffect, useState} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Image, Text, View} from 'react-native-ui-lib';
// import {RouteProp} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {ImageSourcePropType, StyleSheet} from 'react-native';
// import {RootStackParams, RouteNames} from '../../navigation';
// import AppImages from '../../constants/AppImages';
// import AppColors from '../../constants/AppColors';
// import AppFonts from '../../constants/AppFonts';
// import HomeScreen from '../home/HomeScreen';
// import MyTripScreen from '../mytrip/MyTripScreen';
// import AddTripScreen from '../addtrip/AddTripScreen';
// import ProfileScreen from '../profile/ProfileScreen';

// const Tab = createBottomTabNavigator();

// export type BottomTabsNavigationProps = NativeStackNavigationProp<
//   RootStackParams,
//   'BottomTabs'
// >;

// export type BottomTabsRouteProps = RouteProp<RootStackParams, 'BottomTabs'>;

// interface Props {}

// const BottomTabs: React.FC<Props> = () => {
//   const renderView = (focused: boolean, title: string, source: any) => {
//     return (
//       <View center>
//         <Image
//           source={source}
//           resizeMode="contain"
//           style={{
//             width: 24,
//             height: 24,
//             tintColor: focused ? AppColors.Orange : 'white',
//           }}
//         />
//         <Text
//           style={[styles.text, {color: focused ? AppColors.Orange : 'white'}]}>
//           {title}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           position: 'absolute',
//           height: 80,
//           backgroundColor: AppColors.Black,
//           borderTopLeftRadius: 34,
//           borderTopRightRadius: 34,
//           borderWidth:1,
//           borderColor:AppColors.Black,
//           elevation:10
//         },
//       }}>
//       <Tab.Screen
//         name={RouteNames.HomeScreen}
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({focused}) =>
//             renderView(focused, 'Home', AppImages.HOME),
//         }}
//       />
//       <Tab.Screen
//         name={RouteNames.MyTripScreen}
//         component={MyTripScreen}
//         options={{
//           tabBarIcon: ({focused}) =>
//             renderView(focused, 'My Trips', AppImages.JEEP),
//         }}
//       />

//       <Tab.Screen
//         name={RouteNames.AddTripScreen}
//         component={AddTripScreen}
//         options={{
//           tabBarIcon: ({focused}) =>
//             renderView(focused, 'Add Trip', AppImages.ADDTRIP),
//         }}
//       />

//       <Tab.Screen
//         name={RouteNames.ProfileScreen}
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({focused}) =>
//             renderView(focused, 'Profile', AppImages.PROFILE),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabs;

// const styles = StyleSheet.create({
//   text: {
//     fontFamily: AppFonts.REGULAR,
//     fontSize: 14,
//     textAlign: 'center',
//   },
// });

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
