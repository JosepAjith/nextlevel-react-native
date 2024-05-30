import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import {
  getMonthDate,
  getUserDate,
  showToast,
} from '../../constants/commonUtils';
import AppImages from '../../constants/AppImages';
import {Linking, TouchableOpacity} from 'react-native';

interface Props {
  data: any;
}

const Personal = ({data}: Props) => {
  const handlePress = (phoneNumber: string, status: string) => {
    const whatsappURL = `whatsapp://send?phone=${phoneNumber}`;
    const smsURL = `sms:${phoneNumber}`;
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(
      status == 'whatsapp' ? whatsappURL : status == 'sms' ? smsURL : phoneUrl,
    )
      .then(supported => {
        if (supported) {
          return Linking.openURL(status == 'whatsapp' ? whatsappURL : status == 'sms' ? smsURL : phoneUrl);
        } else {
          showToast(`Cannot open ${status}. Make sure the app is installed.`);
        }
      })
      .catch(err => {
        console.error('An error occurred', err)
        showToast('An error occurred. Please try again.');
  });
  };
  return (
    <View>
      <View row style={{justifyContent: 'space-between'}} marginB-20 marginH-30>
        <TouchableOpacity onPress={() => handlePress(data.phone, 'phone')}>
          <Image source={AppImages.CALL} width={30} height={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(data.phone, 'sms')}>
          <Image source={AppImages.SMS} width={32} height={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(data.phone, 'whatsapp')}>
          <Image source={AppImages.WHATSAPP} width={30} height={30} />
        </TouchableOpacity>
      </View>

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
        <View row style={styles.divider}>
          <Text style={styles.text}>Phone</Text>
          <View flex right>
            <Text style={[styles.text, {opacity: 0.8}]}>{data.phone}</Text>
          </View>
        </View>

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
            <Text style={[styles.text, {opacity: 0.8}]}>
              {data.nationality}
            </Text>
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
    </View>
  );
};

export default Personal;
