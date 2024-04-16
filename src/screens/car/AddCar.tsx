import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import { styles } from '../addtrip/styles';
import { CarRequest } from '../../api/car/CarRequest';
import { CarValidation } from '../../api/car/CarValidation';
import DocumentPicker from 'react-native-document-picker';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { createCar, reset } from '../../api/car/CarCreateSlice';
import {
  getCurrentDateDb,
  getUserDate,
  showToast,
} from '../../constants/commonUtils';
import moment from 'moment';
import ImageSelector from '../../components/ImageSelector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BackgroundLoader from '../../components/BackgroundLoader';

const { TextField } = Incubator;

export type AddCarNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AddCar'
>;

export type AddCarRouteProps = RouteProp<RootStackParams, 'AddCar'>;

interface Props { }

const AddCar: React.FC<Props> = ({ route }: any) => {
  const navigation = useNavigation<AddCarNavigationProps>();
  const id = route.params.id;
  const [isImageClick, setImageClick] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { CarData, loadingCar, CarError } = useSelector(
    (state: RootState) => state.CarCreate,
  );
  const [carInput, setCar] = useState<CarRequest>(new CarRequest());
  const [carValidate, setValidate] = useState<CarValidation>(
    new CarValidation(),
  );
  const { profileDetails } = useSelector(
    (state: RootState) => state.ProfileDetails,
  );
  const { IsNetConnected } = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  useEffect(() => {
    if (id !== 0 && profileDetails) {
      // Find the car details based on the id from profileDetails
      const carDetails = profileDetails.user.cars.find(
        (car: any) => car.id === id,
      );
      if (carDetails) {  
        // Create a new object to hold the updated car details
        const updatedCar = {
          ...carInput,
          id: id,
          model_name: carDetails.model_name,
          purchased_year: getUserDate(carDetails.purchased_year),
          make: carDetails.make,
          trim: carDetails.trim,
          model_series: carDetails.model_series,
        };
        
        // If image exists and is not '/empty.jpg', add it to the updatedCar object
        if (carDetails.image && carDetails.image !== '/empty.jpg') {
          updatedCar.image = {
            uri: carDetails.image,
            type: 'image/png',
            name: 'image.png',
            size: '',
            fileCopyUri: '',
          };
        }
  
        // Set the updated car details into carInput
        setCar(updatedCar);
      }
    }
  }, [id, profileDetails]);

  function isValidate(): boolean {
    if (!IsNetConnected) {
      showToast('Need internet connection');
      return false;
    }
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
    console.log(carInput.image)
    let formData = new FormData();
    if (id != 0) {
      formData.append('id', carInput.id);
    }
    formData.append('model_name', carInput.model_name);
    formData.append('image', {
      uri: carInput.image.uri,
      name: carInput.image.name,
      type: carInput.image.type,
    });
    formData.append(
      'purchased_year',
      moment(carInput.purchased_year, 'DD-MM-YYYY', true).format('YYYY-MM-DD'),
    );
    formData.append('make', carInput.make);
    formData.append('trim', carInput.trim);
    formData.append('model_series', carInput.model_series);
console.log(formData._parts[2])
    dispatch(
      createCar({
        requestBody: formData,
        uri: id == 0 ? 'car/save' : 'car/update',
      }),
    )
      .then(() => {
        dispatch(reset());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    if (CarData != null) {
      if (!loadingCar && !CarError && CarData.status) {
        showToast(CarData.message);
        navigation.goBack();
      } else {
        showToast(CarData.message);
      }
    }
  }, [CarData]);

  const showDatePicker = () => {
    setValidate({ ...carValidate, isDatePickerVisible: true });
  };

  const hideDatePicker = () => {
    setValidate({ ...carValidate, isDatePickerVisible: false });
  };

  const handleConfirm = (date: any) => {
    setCar({ ...carInput, purchased_year: getUserDate(date) });
    setValidate({ ...carValidate, InvalidYear: false });
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }} // Make sure it takes full height of the screen
    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} // Adjust behavior for iOS
  >
    <View flex backgroundColor={AppColors.Black}>

      {loadingCar && <BackgroundLoader />}

      <ScrollView>
        <View padding-20>


          <Header title={id == 0 ? 'Add Car' : 'Update Car'} />



          <TouchableOpacity onPress={() => setImageClick(!isImageClick)}>
            <View center style={styles.imageView}>
              {carInput.image.uri ? (
                <Image
                  source={{ uri: carInput.image.uri }}
                  style={{ width: '100%', height: '100%', borderRadius: 20 }}
                />
              ) : (
                <>
                  <Image source={AppImages.GALLERY} width={34} height={30} />
                  <Text style={styles.add}>+ Add Photos</Text>
                  <Text style={styles.click}>
                    (Click From camera or browse to upload)
                  </Text>
                  <Text red10>{carValidate.InvalidImage ? '*Required' : ''}</Text>
                </>
              )}
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
            value={carInput.model_name}
            onChangeText={(text: any) => {
              setCar({ ...carInput, model_name: text });
              setValidate({ ...carValidate, InvalidName: false });
            }}
            trailingAccessory={
              <Text red10>{carValidate.InvalidName ? '*Required' : ''}</Text>
            }
          />

          <TouchableOpacity onPress={showDatePicker}>
            <TextField
              fieldStyle={styles.field}
              label={'Purchase Date'}
              placeholder={'DD-MM-YYYY'}
              placeholderTextColor={'#999999'}
              labelStyle={styles.label}
              style={styles.text}
              editable={false}
              paddingH-20
              marginB-20
              value={carInput.purchased_year}
              trailingAccessory={
                <Text red10>{carValidate.InvalidYear ? '*Required' : ''}</Text>
              }
            />
            <DateTimePickerModal
              isVisible={carValidate.isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </TouchableOpacity>

          <TextField
            fieldStyle={styles.field}
            label={'Make'}
            placeholder={'Enter make details'}
            placeholderTextColor={'#999999'}
            labelStyle={styles.label}
            style={styles.text}
            paddingH-20
            marginB-20
            value={carInput.make}
            onChangeText={(text: any) => {
              setCar({ ...carInput, make: text });
              setValidate({ ...carValidate, InvalidMake: false });
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
            value={carInput.trim}
            onChangeText={(text: any) => {
              setCar({ ...carInput, trim: text });
              setValidate({ ...carValidate, InvalidTrim: false });
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
            value={carInput.model_series}
            onChangeText={(text: any) => {
              setCar({ ...carInput, model_series: text });
              setValidate({ ...carValidate, InvalidSeries: false });
            }}
            trailingAccessory={
              <Text red10>{carValidate.InvalidSeries ? '*Required' : ''}</Text>
            }
          />

          <ButtonView
            title={id == 0 ? 'Add Car' : 'Update Car'}
            onPress={() => {
              if (isValidate()) {
                addingCar();
              }
            }}
          />
        </View>
      </ScrollView>

      {isImageClick && (
        <ImageSelector
          close={() => setImageClick(false)}
          isItem={(item: any) => {
            setCar({ ...carInput, image: item });
            setValidate({ ...carValidate, InvalidImage: false });
          }}
        />
      )}
    </View>
</KeyboardAvoidingView>
  );
};
export default AddCar;
