import React, {useEffect, useState} from 'react';
import {
  Button,
  Checkbox,
  Chip,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../mytrip/styles';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {fetchUserList} from '../../api/user/UserListSlice';
import BackgroundLoader from '../../components/BackgroundLoader';
import AppFonts from '../../constants/AppFonts';
import {fetchRoleUpgradeList} from '../../api/roleUpgrade/RoleUpgradeSlice';
import ButtonView from '../../components/ButtonView';
import AppStyles from '../../constants/AppStyles';
import {reset, updateLevel} from '../../api/roleUpgrade/UpdateLevelSlice';
import {showToast} from '../../constants/commonUtils';
import CustomAlert from '../../components/CustomAlert';

const {TextField} = Incubator;

export type UpgradeLevelNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'UpgradeLevel'
>;

export type UpgradeLevelRouteProps = RouteProp<RootStackParams, 'UpgradeLevel'>;

interface Props {}

const UpgradeLevel: React.FC<Props> = () => {
  const navigation = useNavigation<UpgradeLevelNavigationProps>();
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {upgrades, loadingUpgrades} = useSelector(
    (state: RootState) => state.RoleUpgrade,
  );
  const {updateLevelData, loadingLevelUpdate, LevelUpdateError} = useSelector(
    (state: RootState) => state.UpdateLevel,
  );
  const {IsNetConnected} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentAction, setCurrentAction] = useState<{
    id: any;
    status: any;
  } | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      FetchList();

      return () => {};
    }, []),
  );

  const FetchList = () => {
    if (IsNetConnected) {
      dispatch(fetchRoleUpgradeList({requestBody: ''}));
    }
  };

  const updatingLevel = async (id: any, status: any) => {
    let request = {
      user_id: id,
      is_upgrade: status,
    };
    dispatch(
      updateLevel({
        requestBody: request,
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (updateLevelData != null) {
      if (!loadingLevelUpdate && !LevelUpdateError && updateLevelData.status) {
        showToast(updateLevelData.message);
        FetchList();
      } else {
        showToast(updateLevelData.message);
        FetchList();
      }
    }
  }, [updateLevelData]);

  const handleConfirm = () => {
    if (currentAction) {
      updatingLevel(currentAction.id, currentAction.status);
    }
    setAlertVisible(false);
  };

  const handleCancel = () => {
    setAlertVisible(false);
    setCurrentAction(null);
  };

  const showAlert = (id: any, status: any) => {
    const message =
      status === 1
        ? 'Are you sure you want to upgrade this user?'
        : 'Are you sure you want to cancel the upgrade?';
    setAlertMessage(message);
    setCurrentAction({id, status});
    setAlertVisible(true);
  };

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header
        title="Level Upgrade"
        rightIcon={AppImages.REFRESH}
        rightOnpress={() => {
          FetchList();
        }}
      />

      {loadingUpgrades && <BackgroundLoader />}

      <View
        style={{backgroundColor: '#1B1E1D', borderRadius: 10}}
        marginV-20
        padding-10>
        <Text
          style={[styles.name, {fontFamily: AppFonts.MEDIUM, lineHeight: 20}]}>
          Level up the users while completing 10 trips, making it an enjoyable
          experience.
        </Text>
      </View>

      {upgrades?.data.length == 0 ? (
        <View flex center>
          <Text white text70>
            No account to upgrade
          </Text>
        </View>
      ) : (
        <FlatList
          data={upgrades?.data}
          numColumns={2}
          renderItem={({item, index}) => {
            const isEvenIndex = index % 2 === 0;
            const alignmentStyle = isEvenIndex ? 'flex-start' : 'flex-end';

            return (
              <View style={{alignItems: alignmentStyle, flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch({type: 'SET_USER_ID', payload: item.user_id});
                    navigation.navigate(RouteNames.ProfileScreen);
                  }}>
                  <View style={[styles.marshalView, {width: itemWidth}]}>
                    <Image
                      source={
                        item.user.image
                          ? {uri: item.user.image}
                          : AppImages.PLACEHOLDER
                      }
                      style={{
                        width: '100%',
                        height: 130,
                        borderRadius: 5,
                      }}
                    />
                    <View paddingV-10 center>
                      <Text style={styles.name}>{item.user.name}</Text>
                      <Text style={styles.email}>{item.user.email}</Text>
                      <Text style={styles.email}>{item.user.level}</Text>
                    </View>

                    <View
                      row
                      style={{justifyContent: 'space-between'}}
                      marginH-10
                      marginB-10>
                      <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => showAlert(item.user_id, 1)}>
                        <Text
                          style={[
                            styles.text,
                            {color: 'white', fontFamily: AppFonts.INTER_MEDIUM},
                          ]}>
                          Upgrade
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, {backgroundColor: 'white'}]}
                        onPress={() => showAlert(item.user_id, 0)}>
                        <Text
                          style={[
                            styles.text,
                            {color: 'black', fontFamily: AppFonts.INTER_MEDIUM},
                          ]}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </View>
  );
};
export default UpgradeLevel;
