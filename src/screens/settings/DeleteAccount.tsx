import React, {useEffect, useState} from 'react';
import {Image, Text, View, Incubator, Checkbox} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {Header} from '../../components/Header';
import {ScrollView, TouchableOpacity} from 'react-native';
import DropdownComponent from '../../components/DropdownComponent';
import {styles} from './styles';
import ButtonView from '../../components/ButtonView';
import {AccountDeleteRequest} from '../../api/accountDelete/AccountDeleteRequest';
import AppImages from '../../constants/AppImages';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAccount, reset} from '../../api/accountDelete/AccountDeleteSlice';
import {showToast} from '../../constants/commonUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../../constants/AppStrings';

const {TextField} = Incubator;

export type DeleteAccountNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'DeleteAccount'
>;

export type DeleteAccountRouteProps = RouteProp<
  RootStackParams,
  'DeleteAccount'
>;

interface Props {}

const Reasons = [
  {
    type: 'I am not using this account anymore',
    id: 'I am not using this account anymore',
  },
  {type: 'I have another account', id: 'I have another account'},
  {
    type: 'I want to create a new account',
    id: 'I want to create a new account',
  },
  {
    type: 'Account security concerns/ Unauthorized activity',
    id: 'Account security concerns/ Unauthorized activity',
  },
  {type: 'Privacy concerns', id: 'Privacy concerns'},
  {
    type: 'I do not want to provide a reason',
    id: 'I do not want to provide a reason',
  },
];

const DeleteAccount: React.FC<Props> = () => {
  const navigation = useNavigation<DeleteAccountNavigationProps>();
  const [agree, setAgree] = useState(false);
  const [deleteInput, setDelete] = useState<AccountDeleteRequest>(
    new AccountDeleteRequest(),
  );
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {deleteData, loadingDelete, deleteError} = useSelector(
    (state: RootState) => state.AccountDelete,
  );

  function isValidate(): boolean {
    if (deleteInput.reason == '') {
      setDelete({
        ...deleteInput,
        invalidReason: true,
        error: '*Required',
      });
      return false;
    }
    if (deleteInput.password == '') {
      setDelete({
        ...deleteInput,
        invalidPassword: true,
        error: '*Required',
      });
      return false;
    }
    if (!agree){
      showToast("Agree to your closure")
    }

    return true;
  }
console.log(deleteInput)
  const Delete = async () => {
    let request = JSON.stringify({
      
      password: deleteInput.password,
      reason: deleteInput.reason
    })
    console.log(request, 'jjj')
    dispatch(deleteAccount({requestBody: request}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (deleteData != null) {
      if (!loadingDelete && !deleteError && deleteData.status) {
        showToast(deleteData.message);

        LoggingOut();
      } else {
        showToast(deleteData.message);
      }
    }
  }, [deleteData]);

  const LoggingOut = async () => {
    await AsyncStorage.removeItem(AppStrings.ACCESS_TOKEN);
    await AsyncStorage.removeItem(AppStrings.IS_LOGIN);
    await AsyncStorage.removeItem(AppStrings.TYPE);
    navigation.reset({
      index: 0,
      routes: [{name: RouteNames.LoginScreen}],
    });
  };

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="Delete Account" />

      <ScrollView>
        <View flex marginT-30 >
          <Text style={[styles.title, {fontSize: 18}]}>
            Account closure is a permanent action
          </Text>

          <View marginV-20>
            <Text style={[styles.name, {textAlign: 'justify'}]}>
              Please note account close is permanent action and once your
              account is closed it will no longer be available to you and can
              not be restored. If you decide later that you want to start
              ordering...
            </Text>
          </View>

          <Text style={styles.label}>
            Please select the main reason for closing your account
          </Text>

          <DropdownComponent
            data={Reasons}
            item={deleteInput.reason}
            label="type"
            value="id"
            onChange={(item: any) => {
              console.log(item)
              setDelete({
                ...deleteInput,
                reason: item,
                invalidReason: false,
              });
            }}
            error={deleteInput.invalidReason}
            placeholder={'Choose reason'}
          />

          <View row centerV marginB-20>
            <Checkbox
              value={agree}
              label={
                'Yes, I want to permanently close my account and delete my data'
              }
              labelStyle={styles.name}
              color={AppColors.Orange}
              style={{borderColor: 'white'}}
              onValueChange={value => setAgree(value)}
            />
          </View>

          <TextField
            fieldStyle={styles.field}
            label={'Confirm Password'}
            labelStyle={styles.label}
            style={styles.text}
            paddingH-20
            marginB-25
            secureTextEntry={!deleteInput.showPassword}
            trailingAccessory={
              <View row center>
                <Text marginR-10 red10>
                  {deleteInput.invalidPassword ? '*Required' : ''}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setDelete({
                      ...deleteInput,
                      showPassword: !deleteInput.showPassword,
                    })
                  }>
                  {deleteInput.showPassword ? (
                    <Image source={AppImages.EYECLOSE} width={23} height={15} />
                  ) : (
                    <Image source={AppImages.EYE} />
                  )}
                </TouchableOpacity>
              </View>
            }
            onChangeText={(text: any) => {
              setDelete({
                ...deleteInput,
                password: text,
                invalidPassword: false,
              });
            }}
          />

<ButtonView
        title="CLOSE MY ACCOUNT"
        onPress={() => {
          if (isValidate()) {
            Delete();
          }
        }}
      />
        </View>

      
      </ScrollView>

     
    </View>
  );
};

export default DeleteAccount;
