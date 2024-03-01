import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {TouchableOpacity} from 'react-native';
import {RouteNames} from '../../navigation';
import {getUserDate} from '../../constants/commonUtils';

interface Props {
  navigation: any;
  data: any;
}

const MyCars = ({navigation, data}: Props) => {
 
  return (
    <View>
      {data != null ? (
        <>
          <View padding-20 center style={styles.view}>
            {/* <Image source={data.image == null ? AppImages.JEEP :{uri:data.image}} width={300} height={250} /> */}

            <Text style={styles.carTitle}>{data.model_name.toUpperCase()}</Text>
            <Text style={[styles.carText, {marginVertical: 10}]}>
              Purchase Year:{' '}
              <Text white>{getUserDate(data.purchased_year)}</Text>
            </Text>
            <Text style={styles.carText}>
              Model Series : <Text white>{data.model_series}</Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.AddCar)}>
            <View row center style={styles.plus}>
              <Text style={styles.car}>Edit Car</Text>
              <Image
                source={AppImages.ADDTRIP}
                width={14}
                height={14}
                tintColor="black"
              />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.AddCar)}>
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
      )}
    </View>
  );
};

export default MyCars;
