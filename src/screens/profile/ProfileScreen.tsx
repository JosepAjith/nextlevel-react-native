import React, {useState} from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import Personal from './Personal';
import MyTrips from './MyTrips';
import Activities from './Activities';

const {TextField} = Incubator;

export type ProfileScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'ProfileScreen'
>;

export type ProfileScreenRouteProps = RouteProp<
  RootStackParams,
  'ProfileScreen'
>;

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const [tab, setTab] = useState('personal');

  return (
    <ScrollView style={{backgroundColor:AppColors.Black}}>
      <View flex backgroundColor={AppColors.Black} padding-20>
        <Header leftIcon={false} title="Profile" />

        <View row marginV-20>
          <View flex>
            <View marginB-10 style={styles.imageView}>
              <Image
                source={AppImages.MAN}
                width={70}
                height={70}
                style={{borderRadius: 35}}
              />
            </View>
            <Text style={styles.name}>Omar Kentar</Text>
            <View row marginV-10>
              <Text style={styles.rank}>Rank</Text>
              <View row centerV marginL-20>
                <Text style={[styles.rank, {color: AppColors.Orange}]}>
                  Marshal
                </Text>
                <Image
                  source={AppImages.STAR}
                  width={10}
                  height={10}
                  marginL-5
                />
              </View>
            </View>
          </View>

          <View flex right>
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteNames.SettingsScreen)}>
              <Image source={AppImages.SETTINGS} width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.middle}>
          <TouchableOpacity onPress={() => setTab('personal')}>
            <View
              backgroundColor={tab == 'personal' ? AppColors.Orange : 'white'}
              style={styles.inner}>
              <Text
                color={tab == 'personal' ? 'white' : AppColors.Black}
                style={styles.tabText}>
                Personal Info
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('trips')}>
            <View
              backgroundColor={tab == 'trips' ? AppColors.Orange : 'white'}
              style={styles.inner}>
              <Text
                color={tab == 'trips' ? 'white' : AppColors.Black}
                style={styles.tabText}>
                My Cars
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('activity')}>
            <View
              backgroundColor={tab == 'activity' ? AppColors.Orange : 'white'}
              style={styles.inner}>
              <Text
                color={tab == 'activity' ? 'white' : AppColors.Black}
                style={styles.tabText}>
                Activities
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {tab == 'personal' && <Personal />}
        {tab == 'trips' && <MyTrips navigation={navigation}/>}
        {tab == 'activity' && <Activities navigation={navigation}/>}
      </View>
    </ScrollView>
  );
};
export default ProfileScreen;
