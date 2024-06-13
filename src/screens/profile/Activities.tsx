import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {Dimensions, TouchableOpacity} from 'react-native';
import {RouteNames} from '../../navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';

const windowWidth = Dimensions.get('window').width;

interface Props {
  navigation: any;
  data: any;
  isReplace: any;
}

const Activities = ({navigation, data, isReplace}: Props) => {
  const {type, userId} = useSelector(
    (state: RootState) => state.GlobalVariables,
  );

  const dispatch = useDispatch();

  const renderData = () => {
    return Object.entries(data).map(([title, value], index, array) => (
      <TouchableOpacity
        onPress={() => {
          if (value > 0) {
            if(title == 'support'){
              navigation.navigate(RouteNames.SupportUserTrips, {status: title, userId: userId});
            }
            else{
            navigation.navigate(RouteNames.UserTrips, {status: title, userId: userId});
            }
          }
        }}>
        <View
          row
          key={index}
          style={[index === array.length - 1 ? {padding: 20} : styles.divider]}>
          <Text style={styles.text}>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Text>
          <View flex right>
            <Text style={[styles.text, {opacity: 0.8}]}>{value}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      {userId == 0 && (
        <View row width={windowWidth} style={styles.top}>
          <TouchableOpacity
            style={styles.smallView}
            onPress={() => {
              dispatch({type: 'SET_CHIP', payload: 1});
              isReplace(true);
            }}>
            <Image source={AppImages.MY} width={30} height={30} />
            <Text style={[styles.text, {fontSize: 13}]}>My Trips</Text>
          </TouchableOpacity>
          {type == 'Explorer' ||
          type == 'Marshal' ||
          type == 'Super Marshal' ? (
            <TouchableOpacity
              style={[styles.smallView, styles.border]}
              onPress={() => {
                dispatch({type: 'SET_CHIP', payload: 2});
                isReplace(true);
              }}>
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

          <TouchableOpacity
            style={styles.smallView}
            onPress={() => {
              dispatch({type: 'SET_CHIP', payload: 3});
              isReplace(true);
            }}>
            <Image source={AppImages.CLOSED} width={30} height={30} />
            <Text style={[styles.text, {fontSize: 13}]}>Closed Trips</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={[styles.name, {fontSize: 16}]}>Trip Details</Text>

      <View style={styles.view} marginV-20>
        {renderData()}
      </View>
    
    </View>
  );
};

export default Activities;
