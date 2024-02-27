import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {Dimensions, TouchableOpacity} from 'react-native';
import { RouteNames } from '../../navigation';

const windowWidth = Dimensions.get('window').width;

interface Props {
  navigation: any;
}

const Activities = ({navigation}: Props) => {
  return (
    <View>
      <View row width={windowWidth} style={styles.top}>
        <TouchableOpacity style={styles.smallView}>
          <Image source={AppImages.MY} width={30} height={30} />
          <Text style={[styles.text, {fontSize: 13}]}>My Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.smallView, styles.border]}>
          <Image source={AppImages.CREATED} width={30} height={30} />
          <Text style={[styles.text, {fontSize: 13}]}>Created Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallView}>
          <Image source={AppImages.CLOSED} width={30} height={30} />
          <Text style={[styles.text, {fontSize: 13}]}>Closed Trips</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.name,{fontSize:16}]}>Trip Details</Text>

      <View style={styles.view} marginV-20>
      <View row style={styles.divider}>
        <Text style={styles.text}>Present</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>01</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Absent</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>02</Text>
        </View>
      </View>

      <View row style={styles.divider}>
        <Text style={styles.text}>Support Present</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>02</Text>
        </View>
      </View>

      <View row padding-20>
        <Text style={styles.text}>Support</Text>
        <View flex right>
          <Text style={[styles.text,{opacity:0.8}]}>02</Text>
        </View>
      </View>
      </View>

      <Text style={[styles.name,{fontSize:16}]}>User List</Text>

<View style={styles.view} marginV-20>


<TouchableOpacity onPress={()=>navigation.navigate(RouteNames.UserList)}>
<View row padding-20>
  <Text style={styles.text}>View User List</Text>
  <View flex right>
    <Image source={AppImages.RIGHT} width={7} height={12}/>
  </View>
</View>
</TouchableOpacity>
</View>

<Text style={[styles.name,{fontSize:16}]}>Marshals List</Text>

<View style={styles.view} marginV-20>

<TouchableOpacity onPress={()=>navigation.navigate(RouteNames.MarshalList)}>
<View row padding-20>
  <Text style={styles.text}>View Our Marshals</Text>
  <View flex right>
  <Image source={AppImages.RIGHT} width={7} height={12}/>
  </View>
</View>
</TouchableOpacity>
</View>
    </View>
  );
};

export default Activities;
