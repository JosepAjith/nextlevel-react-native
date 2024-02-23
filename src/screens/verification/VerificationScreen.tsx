import React, {useEffect, useState} from 'react';
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
import {TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import OTPTextView from 'react-native-otp-textinput';

const {TextField} = Incubator;

export type VerificationScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'VerificationScreen'
>;

export type VerificationScreenRouteProps = RouteProp<
  RootStackParams,
  'VerificationScreen'
>;

interface Props {}

const VerificationScreen: React.FC<Props> = () => {
  const navigation = useNavigation<VerificationScreenNavigationProps>();
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsTimerRunning(false);
            return 300; // Reset timer to 5 minutes when it reaches 0
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleResend = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
  };

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title={'Verify Your Account'} />

      <View marginT-40 marginB-20>
        <Text style={styles.heading}>Enter OTP</Text>
      </View>

      <OTPTextView
        handleTextChange={e => {}}
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        inputCount={6}
        tintColor={'white'}
      />
      <ButtonView title="Verify OTP" onPress={() => {navigation.navigate(RouteNames.ChangePasswordScreen)}} />

      <View row marginT-10>
        <View flex>
          <Text style={styles.text}>Request code again</Text>
        </View>

        <View flex right>
          {!isTimerRunning ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={[styles.text, {opacity: 1}]}>Send again</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.text}>
              {`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(
                timer % 60,
              ).padStart(2, '0')}`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
export default VerificationScreen;
