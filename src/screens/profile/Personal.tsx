import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import { getUserDate } from '../../constants/commonUtils';

interface Props {
  data: any
}

const Personal = ({data}: Props) => {

  return (
    <View style={styles.view}>
      <View row style={styles.divider}>
        <Text style={styles.text}>Full Name</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>{data.name}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Nick Name</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>{data.nick_name}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Date of birth</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>{data.dob}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Email</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>{data.email}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Nationality</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>{data.nationality}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Emirates</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>{data.emirates}</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Occupation</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>{data.occupation}</Text>
        </View>
      </View>

      <View row padding-20>
        <Text style={styles.text}>Joining Date</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>{getUserDate(data.created_at)}</Text>
        </View>
      </View>
    </View>
  );
};

export default Personal;
