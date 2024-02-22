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
import {TouchableOpacity} from 'react-native';

const {TextField} = Incubator;

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'LoginScreen'
>;

export type LoginScreenRouteProps = RouteProp<RootStackParams, 'LoginScreen'>;

interface Props {}

const LoginScreen: React.FC<Props> = () => {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const [remember, setRemember] = useState(false);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <View center marginT-20 marginB-40>
        <Text style={styles.title}>Sign in</Text>
      </View>

      <TextField
        fieldStyle={styles.field}
        label={'E-mail'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
      />

      <TextField
        fieldStyle={styles.field}
        label={'Password'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginT-25
        trailingAccessory={<Image source={AppImages.EYE} />}
      />
      <View row centerV marginV-30>
        <Checkbox
          value={remember}
          label="Remember me"
          color={AppColors.Orange}
          labelStyle={[styles.forgot, {color: 'white'}]}
          style={{borderColor: 'white'}}
          onValueChange={value => setRemember(value)}
        />
        <View flex right>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(RouteNames.ForgotPasswordScreen)
            }>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ButtonView title="Sign in" onPress={() => {}} />

      <View marginT-20 center>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.RegisterScreen)}>
          <Text style={styles.title}>
            Don't have an account ?{' '}
            <Text color={AppColors.Orange}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginScreen;
