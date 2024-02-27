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
import AppImages from '../../constants/AppImages';
import ButtonView from '../../components/ButtonView';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import { styles } from '../addtrip/styles';

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

  return (
    <ScrollView style={{backgroundColor:AppColors.Black}}>
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="Add Car"/>

      <View center style={styles.imageView}>
        <Image source={AppImages.GALLERY} width={34} height={30}/>
        <Text style={styles.add}>+ Add Photos</Text>
        <Text style={styles.click}>(Click From camera or browse to upload)</Text>
      </View>

      <TextField
        fieldStyle={styles.field}
        label={'Model Name'}
        placeholder={'Enter Model Name'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
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
        trailingAccessory={<Image source={AppImages.DOWN} tintColor='#3F4E59' width={11} height={6} />}
      />

      <ButtonView title='Add Car' onPress={()=>{}}/>
    </View>
    </ScrollView>
  );
};
export default AddCar;
