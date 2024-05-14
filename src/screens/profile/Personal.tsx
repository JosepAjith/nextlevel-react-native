import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import {getMonthDate, getUserDate} from '../../constants/commonUtils';
import AppImages from '../../constants/AppImages';
import {Linking, TouchableOpacity} from 'react-native';

interface Props {
  data: any;
}

const Personal = ({data}: Props) => {

  const handlePress = (phoneNumber: string) => {
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(whatsappURL).then(supported => {
      if (supported) {
        return Linking.openURL(whatsappURL);
      } else {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err));
  };
  return (
    <View style={styles.view}>
      <View row style={styles.divider}>
        <Text style={styles.text}>Full Name</Text>
        <View flex right>
          <Text style={[styles.text, {opacity: 0.8}]}>{data.name}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Nick Name</Text>
        <View flex right>
          <Text style={[styles.text, {opacity: 0.8}]}>{data.nick_name}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => handlePress(data.phone)}>
        <View row style={styles.divider}>
          <Text style={styles.text}>Phone</Text>
          <View flex row right centerV>
            <Text style={[styles.text, {opacity: 0.8}]} marginR-10>
              {data.phone}
            </Text>
            <Image source={AppImages.CALL} width={20} height={20} />
          </View>
        </View>
      </TouchableOpacity>

      <View row style={styles.divider}>
        <Text style={styles.text}>Date of birth</Text>
        <View flex right>
          <Text style={[styles.text, {opacity: 0.8}]}>
            {getMonthDate(data.dob)}
          </Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Email</Text>
        <View flex right>
          <Text style={[styles.text, {opacity: 0.8}]}>{data.email}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Nationality</Text>
        <View flex right>
          <Text style={[styles.text, {opacity: 0.8}]}>{data.nationality}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Emirates</Text>
        <View flex right>
          <Text style={[styles.text, {opacity: 0.8}]}>{data.emirates}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Occupation</Text>
        <View flex right>
          <Text style={[styles.text, {opacity: 0.8}]}>{data.occupation}</Text>
        </View>
      </View>

      <View row padding-20>
        <Text style={styles.text}>Joining Date</Text>
        <View flex right>
          <Text style={[styles.text, {opacity: 0.8}]}>
            {getMonthDate(data.created_at)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Personal;
