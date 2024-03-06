import React, {useRef, useState, useEffect} from 'react';
import {Chip, Text, View} from 'react-native-ui-lib';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  PanResponder,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import ButtonView from '../../components/ButtonView';
import AppColors from '../../constants/AppColors';
import {useDispatch} from 'react-redux';
const deviceHeight = Dimensions.get('window').height;

const TripFilter = (props: {close: any}) => {
  const dispatch = useDispatch();
  const close = props.close;
  const [chip, setChip] = useState<number>(null);
  const [selected, setSelected] = useState('');
  const [filter, setFilter] = useState([
    {id: 1, status: 'First Join'},
    {id: 2, status: 'newbie'},
    {id: 3, status: 'newbie+'},
    {id: 4, status: 'Intermediate Exam'},
    {id: 5, status: 'Intermediate Exam'},
    {id: 6, status: 'Intermediate+'},
    {id: 7, status: 'Advance Exam'},
    {id: 8, status: 'Advanced'},
    {id: 9, status: 'Explorer'},
    {id: 10, status: 'Marshal'},
    {id: 11, status: 'Super Marshal'},
    {id: 12, status: 'Get To Gether'},
  ]);

  useEffect(() => {
    openModal();
  }, []);

  const modalY = useRef(new Animated.Value(deviceHeight)).current;

  const openModal = () => {
    Animated.timing(modalY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalY, {
      toValue: 300,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      close();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          modalY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(modalY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const SaveFilter = () => {
    dispatch({type: 'SET_FILTER_VALUE', payload: selected});
    close();
  };

  return (
    <Animated.View
      style={[styles.modal, {transform: [{translateY: modalY}]}]}
      {...panResponder.panHandlers}>
      <View padding-20 style={styles.divider}>
        <Text style={[styles.statusText, {fontSize: 16}]}>Filter</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        {filter.map((item, index) => (
          <Chip
            key={index}
            label={item.status}
            onPress={() => {
              setChip(index);
              setSelected(item.status);
            }}
            labelStyle={[
              styles.chipLabel,
              {color: chip == index ? 'white' : 'black'},
            ]}
            containerStyle={[
              styles.chip,
              {
                backgroundColor:
                  chip == index ? AppColors.Orange : 'transparent',
                borderColor: chip == index ? AppColors.Orange : 'black',
                marginRight: 10,
                marginBottom: 10,
                padding: 5,
              },
            ]}
          />
        ))}
      </View>

      <View padding-20>
        <ButtonView title="Save filter" onPress={SaveFilter} black={true} />
      </View>
    </Animated.View>
  );
};

export default TripFilter;
