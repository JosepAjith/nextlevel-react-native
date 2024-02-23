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

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');

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
