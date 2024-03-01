import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {Dimensions, TouchableOpacity} from 'react-native';
import {RouteNames} from '../../navigation';
import {useSelector} from 'react-redux';
import { RootState } from '../../../store';

const windowWidth = Dimensions.get('window').width;

interface Props {
  navigation: any;
  data: any;
}

const Activities = ({navigation, data}: Props) => {
  const {type} = useSelector((state: RootState) => state.GlobalVariables);

  const renderData = () => {
    return Object.entries(data).map(([title, value], index, array) => (
      <View row style={[index === array.length - 1 ? {padding:20} : styles.divider]}>
          <Text style={styles.text}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
          <View flex right>
            <Text style={[styles.text, {opacity: 0.8}]}>{value}</Text>
          </View>
        </View>
    ));
  };

  return (
    <View>
      <View row width={windowWidth} style={styles.top}>
        <TouchableOpacity style={styles.smallView}>
          <Image source={AppImages.MY} width={30} height={30} />
          <Text style={[styles.text, {fontSize: 13}]}>My Trips</Text>
        </TouchableOpacity>
        {type != 'user' ? (
          <TouchableOpacity style={[styles.smallView, styles.border]}>
            <Image source={AppImages.CREATED} width={30} height={30} />
            <Text style={[styles.text, {fontSize: 13}]}>Created Trips</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              borderLeftColor: 'rgba(255,255,255,0.2)',
              borderLeftWidth: 1,
            }}
          />
        )}

        <TouchableOpacity style={styles.smallView}>
          <Image source={AppImages.CLOSED} width={30} height={30} />
          <Text style={[styles.text, {fontSize: 13}]}>Closed Trips</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.name, {fontSize: 16}]}>Trip Details</Text>
      
      <View style={styles.view} marginV-20>
      {renderData()}
      </View>

      <Text style={[styles.name, {fontSize: 16}]}>User List</Text>

      <View style={styles.view} marginV-20>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.UserList)}>
          <View row padding-20>
            <Text style={styles.text}>View User List</Text>
            <View flex right>
              <Image source={AppImages.RIGHT} width={7} height={12} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={[styles.name, {fontSize: 16}]}>Marshals List</Text>

      <View style={styles.view} marginV-20>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.MarshalList)}>
          <View row padding-20>
            <Text style={styles.text}>View Our Marshals</Text>
            <View flex right>
              <Image source={AppImages.RIGHT} width={7} height={12} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Activities;
