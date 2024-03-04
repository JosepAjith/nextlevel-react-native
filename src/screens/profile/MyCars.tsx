import React, { useEffect } from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {FlatList, TouchableOpacity} from 'react-native';
import {RouteNames} from '../../navigation';
import {getUserDate, showToast} from '../../constants/commonUtils';
import {AnyAction, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCar, reset} from '../../api/car/CarDeleteSlice';
import { fetchProfileDetails } from '../../api/profile/ProfileDetailsSlice';

interface Props {
  navigation: any;
  data: any;
}

const MyCars = ({navigation, data}: Props) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {CarDeleteData, loadingCarDelete, CarDeleteError} = useSelector(
    (state: RootState) => state.CarDelete,
  );

  const deletingCar = (id: any) => {
    dispatch(deleteCar({requestBody: {id: id}}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (CarDeleteData != null) {
      if (!loadingCarDelete && !CarDeleteError && CarDeleteData.status) {
        showToast(CarDeleteData.message);
        dispatch(fetchProfileDetails({requestBody: ''}));
      } else {
        showToast(CarDeleteData.message);
      }
    }
  }, [CarDeleteData]);

  return (
    <View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View padding-20 center style={styles.view} marginB-10>
              <View row absR absT marginR-10 marginT-10>
                <TouchableOpacity onPress={() => deletingCar(item.id)}>
                  <Image
                    source={AppImages.DELETE}
                    marginR-10
                    width={25}
                    height={25}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(RouteNames.AddCar, {id: item.id})
                  }>
                  <Image source={AppImages.PENCIL} width={25} height={25} />
                </TouchableOpacity>
              </View>
              {/* <Image source={data.image == null ? AppImages.JEEP :{uri:data.image}} width={300} height={250} /> */}

              <Text style={styles.carTitle}>
                {item.model_name.toUpperCase()}
              </Text>
              <Text style={[styles.carText, {marginVertical: 5}]}>
                Purchase Year:{' '}
                <Text white>{getUserDate(item.purchased_year)}</Text>
              </Text>
              <Text style={[styles.carText]}>
                Trim: <Text white>{item.trim}</Text>
              </Text>
              <Text style={[styles.carText, {marginVertical: 5}]}>
                Make: <Text white>{item.make}</Text>
              </Text>
              <Text style={styles.carText}>
                Model Series : <Text white>{item.model_series}</Text>
              </Text>
            </View>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(RouteNames.AddCar, {id: 0})}>
        <View row center style={styles.plus}>
          <Text style={styles.car}>Add Car</Text>
          <Image
            source={AppImages.ADDTRIP}
            width={14}
            height={14}
            tintColor="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MyCars;
