import React, {useState} from 'react';
import {Image, Text, View, Incubator} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {Linking, ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import Logout from './Logout';
import DeviceInfo from 'react-native-device-info';

const {TextField} = Incubator;

export type SettingsScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'SettingsScreen'
>;

export type SettingsScreenRouteProps = RouteProp<
  RootStackParams,
  'SettingsScreen'
>;

interface Props {}

const SettingsScreen: React.FC<Props> = () => {
  const navigation = useNavigation<SettingsScreenNavigationProps>();
  const [isPersonal, setPersonal] = useState(false);
  const [isLogout, setLogOut] = useState(false);
  const version = DeviceInfo.getVersion();

  const renderOption = (image: any, text: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress} style={styles.view}>
      <View row flex left centerV>
        <Image source={image} width={28} height={28} />
        <Text
          style={[styles.name, text === 'Log out' && {color: '#FF6565'}]}
          marginL-20>
          {text}
        </Text>
      </View>
      <Image
        source={AppImages.RIGHT}
        width={7}
        height={12}
        tintColor={text === 'Log out' ? '#FF6565' : undefined}
      />
    </TouchableOpacity>
  );

  return (
      <View flex backgroundColor={AppColors.Black}>
        <ScrollView>
          <View padding-20>
        <Header title="Account Settings" />
        <View marginV-20>
          <Text style={styles.title}>Your Account Details</Text>
        </View>
        <TouchableOpacity
          onPress={() => setPersonal(!isPersonal)}
          style={styles.view}>
          <View row flex left centerV>
            <Image source={AppImages.USER} width={24} height={24} />
            <Text style={styles.name} marginL-20>
              Personal details, Password
            </Text>
          </View>
          <Image
            source={isPersonal ? AppImages.DOWNWHITE : AppImages.RIGHT}
            width={isPersonal ? 12 : 7}
            height={isPersonal ? 7 : 12}
          />
        </TouchableOpacity>
        <Text style={styles.description}>
          Revitalize Your Security: Elevate the safeguarding of your account by
          effortlessly updating your password and personal information.
        </Text>
        {isPersonal && (
          <View>
            {renderOption(AppImages.EDIT, 'Edit Profile', () => {
              navigation.navigate(RouteNames.EditProfile);
            })}
            {renderOption(AppImages.KEY, 'Reset Password', () =>
              navigation.navigate(RouteNames.ResetPasswordScreen),
            )}
          </View>
        )}
        {renderOption(AppImages.ABOUT, 'About', () =>
          navigation.navigate(RouteNames.AboutScreen),
        )}
        <Text style={styles.description}>
          Join NXTLEVEL 4X4 for a thrilling desert experience! Gain hands-on
          off-road skills from our experienced Marshals, fostering confidence
          and safety. Embrace a diverse off-road community in the UAE's stunning
          landscapes.
        </Text>

        {renderOption(AppImages.PRIVACY, 'Privacy Policy', () =>
          Linking.openURL('https://next-level.prompttechdemohosting.com/privacy-policy'),
        )}

        <View marginB-20>
          <Text style={styles.title}>Login</Text>
        </View>
        {renderOption(AppImages.DELETE, 'Delete Account', () => { navigation.navigate(RouteNames.DeleteAccount)})}
        {renderOption(AppImages.LOGOUT, 'Log out', () => {
          setLogOut(!isLogout);
        })}  

<View marginV-20 center>
          <Text style={styles.version}>Version {version}</Text>
          <Image source={AppImages.LOGO} marginT-20 width={130} height={80}/>
        </View>
        </View>
        </ScrollView>
         {isLogout && <Logout close={() => setLogOut(false)} navigation={navigation}/>}
      </View>
   
   
  );
};

export default SettingsScreen;
