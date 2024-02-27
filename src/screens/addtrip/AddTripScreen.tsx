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
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';

const {TextField} = Incubator;

export type AddTripScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AddTripScreen'
>;

export type AddTripScreenRouteProps = RouteProp<
  RootStackParams,
  'AddTripScreen'
>;

interface Props {}

const AddTripScreen: React.FC<Props> = () => {
  const navigation = useNavigation<AddTripScreenNavigationProps>();

  return (
    <ScrollView style={{backgroundColor:AppColors.Black}}>
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header leftIcon={false} title="Create Trip"/>

      <View center style={styles.imageView}>
        <Image source={AppImages.GALLERY} width={34} height={30}/>
        <Text style={styles.add}>+ Add Photos</Text>
        <Text style={styles.click}>(Click From camera or browse to upload)</Text>
      </View>

      <TextField
        fieldStyle={styles.field}
        label={'Title'}
        placeholder={'Enter title'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

      <TextField
        fieldStyle={styles.field}
        label={'City'}
        placeholder={'Select city'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
        trailingAccessory={<Image source={AppImages.DOWN} tintColor='#3F4E59' width={11} height={6} />}
      />

<TextField
        fieldStyle={styles.field}
        label={'Area'}
        placeholder={'Enter area details'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={styles.field}
        label={'Place Details'}
        placeholder={'Choose Place details'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={styles.field}
        label={'Level'}
        placeholder={'Select level'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
        trailingAccessory={<Image source={AppImages.DOWN} tintColor='#3F4E59' width={11} height={6} />}
      />

<TextField
        fieldStyle={styles.field}
        label={'Capacity'}
        placeholder={'Enter capacity'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={styles.field}
        label={'Date'}
        placeholder={'Select Date'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={styles.field}
        label={'Meeting Time'}
        placeholder={'Select meeting time'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={styles.field}
        label={'Start Time'}
        placeholder={'Select start time'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={styles.field}
        label={'Finish Time'}
        placeholder={'Select finish time'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={styles.field}
        label={'Joining Date & Time'}
        placeholder={'Select joining date & time'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={styles.field}
        label={'Deadline Date'}
        placeholder={'Select deadline'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

<TextField
        fieldStyle={[styles.field,{height:100}]}
        label={'Description'}
        placeholder={'Enter description'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        padding-20
        marginB-20
        textAlignVertical={'top'}
      />

<TextField
        fieldStyle={styles.field}
        label={'Passengers Allowed'}
        placeholder={'Enter passengers allowed'}
        placeholderTextColor={'#999999'}
        labelStyle={styles.label}
        style={styles.text}
        paddingH-20
        marginB-20
      />

      <ButtonView title='Create Trip' onPress={()=>{}}/>
    </View>
    </ScrollView>
  );
};
export default AddTripScreen;
