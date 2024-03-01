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
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import { styles } from '../addtrip/styles';
import { CarRequest } from '../../api/car/CarRequest';
import { CarValidation } from '../../api/car/CarValidation';
import DocumentPicker from 'react-native-document-picker'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { createCar, reset } from '../../api/car/CarCreateSlice';
import { showToast } from '../../constants/commonUtils';

const {TextField} = Incubator;

export type AddCarNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AddCar'
>;

export type AddCarRouteProps = RouteProp<
  RootStackParams,
  'AddCar'
>;

interface Props {}

const AddCar: React.FC<Props> = () => {
  const navigation = useNavigation<AddCarNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const {CarData, loadingCar, CarError} = useSelector(
    (state: RootState) => state.CarCreate,
  );
  const [carInput, setCar] = useState<CarRequest>(new CarRequest());
  const [carValidate, setValidate] = useState<CarValidation>(
    new CarValidation(),
  );

  const imagePicker = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen'
      })
      setCar({...carInput, image: [pickerResult][0]});
      setValidate({...carValidate, InvalidImage: false});
    } catch (err) {
        console.warn(err)
      }
  }
console.log(carInput)
  function isValidate(): boolean {
    if (carInput.image.uri == '') {
      setValidate({
        ...carValidate,
        InvalidImage: true,
        error: '*Required',
      });
      return false;
    }
    if (carInput.model_name == '') {
      setValidate({
        ...carValidate,
        InvalidName: true,
        error: '*Required',
      });
      return false;
    }
    if (carInput.purchased_year == '') {
      setValidate({
        ...carValidate,
        InvalidYear: true,
        error: '*Required',
      });
      return false;
    }
    if (carInput.make == '') {
      setValidate({
        ...carValidate,
        InvalidMake: true,
        error: '*Required',
      });
      return false;
    }
    if (carInput.trim == '') {
      setValidate({
        ...carValidate,
        InvalidTrim: true,
        error: '*Required',
      });
      return false;
    }
    if (carInput.model_series == '') {
      setValidate({
        ...carValidate,
        InvalidSeries: true,
        error: '*Required',
      });
      return false;
    }

    return true;
  }

  const addingCar = async () => {
    let formData = new FormData();
    formData.append('model_name', carInput.model_name);
    formData.append('image', {
      uri: carInput.image.uri,
      name: carInput.image.name,
      type: carInput.image.type,
    });
    formData.append('purchased_year', carInput.purchased_year);
    formData.append('make', carInput.make);
    formData.append('trim', carInput.trim);
    formData.append('model_series', carInput.model_series);
    console.log(formData,'00000')
    dispatch(createCar({requestBody: formData}))
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (CarData != null) {
      console.log(CarData)
      if (!loadingCar && !CarError && CarData.status) {
        showToast(CarData.message);
      } else {
        showToast(CarData.message);
      }
    }
  }, [CarData]);

  return (
    <ScrollView style={{backgroundColor:AppColors.Black}}>
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="Add Car"/>

<TouchableOpacity onPress={imagePicker}>
      <View center style={styles.imageView}>
        {carInput.image.uri ? 
        <Image source={{uri:carInput.image.uri}} style={{width:'100%',height:'100%',borderRadius:20}}/>
      :
        <>
        <Image source={AppImages.GALLERY} width={34} height={30}/>
        <Text style={styles.add}>+ Add Photos</Text>
        <Text style={styles.click}>(Click From camera or browse to upload)</Text>
        <Text red10>{carValidate.InvalidImage ? '*Required' : ''}</Text>
        </>
}
      </View>
      </TouchableOpacity>

      <TextField
        fieldStyle={styles.field}
        label={'Model Name'}
        placeholder={'Enter Model Name'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
        onChangeText={(text: any) => {
          setCar({...carInput, model_name: text});
          setValidate({...carValidate, InvalidName: false});
        }}
        trailingAccessory={
          <Text red10>{carValidate.InvalidName ? '*Required' : ''}</Text>
        }
      />

      <TextField
        fieldStyle={styles.field}
        label={'Purchase Year'}
        placeholder={'Enter Purchase Year'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
        onChangeText={(text: any) => {
          setCar({...carInput, purchased_year: text});
          setValidate({...carValidate, InvalidYear: false});
        }}
        trailingAccessory={
          <Text red10>{carValidate.InvalidYear ? '*Required' : ''}</Text>
        }
      />

<TextField
        fieldStyle={styles.field}
        label={'Make'}
        placeholder={'Enter make details'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
        onChangeText={(text: any) => {
          setCar({...carInput, make: text});
          setValidate({...carValidate, InvalidMake: false});
        }}
        trailingAccessory={
          <Text red10>{carValidate.InvalidMake ? '*Required' : ''}</Text>
        }
      />

<TextField
        fieldStyle={styles.field}
        label={'Trim'}
        placeholder={'Enter trim details'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
        onChangeText={(text: any) => {
          setCar({...carInput, trim: text});
          setValidate({...carValidate, InvalidTrim: false});
        }}
        trailingAccessory={
          <Text red10>{carValidate.InvalidTrim ? '*Required' : ''}</Text>
        }
      />

<TextField
        fieldStyle={styles.field}
        label={'Model Series'}
        placeholder={'Enter modal'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
        onChangeText={(text: any) => {
          setCar({...carInput, model_series: text});
          setValidate({...carValidate, InvalidSeries: false});
        }}
        trailingAccessory={
          <Text red10>{carValidate.InvalidSeries ? '*Required' : ''}</Text>
        }
      />

      <ButtonView title='Add Car'  onPress={() => {
          if (isValidate()) {
            addingCar();
          }
        }}/>
    </View>
    </ScrollView>
  );
};
export default AddCar;
