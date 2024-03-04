import React, {useState} from 'react';
import {Image, Text, View, Incubator} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';
import AccountDelete from './AccountDelete';

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
  const [isDelete, setDelete] = useState(false);

  const Logout = async () => {
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    await AsyncStorage.removeItem(AppStrings.IS_LOGIN);
    await AsyncStorage.removeItem(AppStrings.TYPE);
    navigation.replace(RouteNames.LoginScreen);
  };

  const renderOption = (image: any, text: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress} style={styles.view}>
      <View row flex left centerV>
        <Image source={image} width={24} height={24} />
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
        <View marginV-20>
          <Text style={styles.title}>Login</Text>
        </View>
        {renderOption(AppImages.DELETE, 'Delete Account', () => {
          setDelete(!isDelete);
        })}
        {renderOption(AppImages.LOGOUT, 'Log out', () => {
          Logout();
        })}  
        </View>
        </ScrollView>
         {isDelete && <AccountDelete close={() => setDelete(false)} navigation={navigation}/>}
      </View>
   
   
  );
};

export default SettingsScreen;
