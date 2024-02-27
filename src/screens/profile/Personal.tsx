import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';

interface Props {}

const Personal = ({}: Props) => {
  return (
    <View style={styles.view}>
      <View row style={styles.divider}>
        <Text style={styles.text}>Full Name</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>Omer Joe Kentar</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Nick Name</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>Kentar</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Date of birth</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>01/02/1995</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Email</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>Omer5475@gmail.com</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Nationality</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>Indian</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Emirates</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>Dubai</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Occupation</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>Engineer</Text>
        </View>
      </View>

      <View row padding-20>
        <Text style={styles.text}>Joining Date</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>25/03/2022</Text>
        </View>
      </View>
    </View>
  );
};

export default Personal;
