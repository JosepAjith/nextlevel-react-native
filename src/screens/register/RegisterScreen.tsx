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
import { Header } from '../../components/Header';

const {TextField} = Incubator;

export type RegisterScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'RegisterScreen'
>;

export type RegisterScreenRouteProps = RouteProp<
  RootStackParams,
  'RegisterScreen'
>;

interface Props {}

const RegisterScreen: React.FC<Props> = () => {
  const navigation = useNavigation<RegisterScreenNavigationProps>();
  const [agree, setAgree] = useState(false);

  return (
    <ScrollView>
      <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title={'Sign up'}/>

        <TextField
          fieldStyle={styles.field}
          label={'Nick Name'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginT-40
        />

        <TextField
          fieldStyle={styles.field}
          label={'Full Name'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginV-25
        />

        <TextField
          fieldStyle={styles.field}
          label={'E-mail'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
        />

        <TextField
          fieldStyle={styles.field}
          label={'Contact Number'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginV-25
        />

        <TextField
          fieldStyle={styles.field}
          label={'Password'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          marginB-25
          trailingAccessory={<Image source={AppImages.EYE} />}
        />

        <TextField
          fieldStyle={styles.field}
          label={'Re-enter password'}
          labelStyle={styles.label}
          style={styles.text}
          paddingH-20
          trailingAccessory={<Image source={AppImages.EYE} />}
        />
        <View row centerV marginV-30>
          <Checkbox
            value={agree}
            label={
              <Text style={[styles.forgot, {color: 'white',lineHeight:20}]}>
                I agree to Dynamic Layers{' '}
                <Text style={styles.lineText}>Notification Policy</Text> and
                acknowledge the{' '}
                <Text style={styles.lineText}>Privacy Policy</Text>.
              </Text>
            }
            color={AppColors.Orange}
            style={{borderColor: 'white'}}
            onValueChange={value => setAgree(value)}
          />
        </View>

        <ButtonView title="Sign up" onPress={() => {}} />

        <View marginT-20 center>
          <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.LoginScreen)}>
          <Text style={styles.title}>
            Already have an account ?{' '}
            <Text color={AppColors.Orange}>Sign in</Text>
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default RegisterScreen;
