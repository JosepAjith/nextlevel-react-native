import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import { TouchableOpacity } from 'react-native';
import { RouteNames } from '../../navigation';

interface Props {
  navigation: any
}

const MyTrips = ({navigation}: Props) => {
  return (
    <View>
    <View padding-20 center style={styles.view}>
      <Image source={AppImages.DUMMY} width={300} height={250} />

      <Text style={styles.carTitle}>JEEP WRANGLER</Text>
      <Text style={[styles.carText,{marginVertical:10}]}>
        Purchase Year: <Text white>18-10-2023</Text>
      </Text>
      <Text style={styles.carText}>
        Modal Series : <Text white>2023 Jeep Wrangler Rubicon 4Xe</Text>
      </Text>
    </View>

<TouchableOpacity onPress={()=>navigation.navigate(RouteNames.AddCar)}>
    <View row center style={styles.plus}>
      <Text style={styles.car}>Add Car</Text>
      <Image source={AppImages.ADDTRIP} width={14} height={14} tintColor='black'/>
    </View>
    </TouchableOpacity>
    </View>
  );
};

export default MyTrips;
