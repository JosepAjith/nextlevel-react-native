import React, {useState} from 'react';
import {
  Button,
  Checkbox,
  Chip,
  Image,
  Incubator,
  Text,
  View,
} from 'react-native-ui-lib';
import {RootStackParams, RouteNames} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {
  Animated,
  Easing,
  FlatList,
  ImageBackground,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import {Header} from '../../components/Header';
import { useDispatch } from 'react-redux';

const {TextField} = Incubator;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export type MyTripScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyTripScreen'
>;

export type MyTripScreenRouteProps = RouteProp<RootStackParams, 'MyTripScreen'>;

interface Props {}

const MyTripScreen: React.FC<Props> = () => {
  const navigation = useNavigation<MyTripScreenNavigationProps>();
  const dispatch = useDispatch();
  const [chip, setChip] = useState(1);
  const [expandedItems, setExpandedItems] = useState([]);
  const [data, setData] = useState([
    {
      img: AppImages.HOME1,
      title: 'Mud & Glory Safari',
      data: '22-04-24',
      time: '06:00 AM',
      capacity: 4,
      position: 'newbie',
      status: 'Live',
      id: 1,
    },
    {
      img: AppImages.HOME2,
      title: 'Wilderness Roamer Rally',
      data: '22-04-24',
      time: '06:00 AM',
      capacity: 5,
      position: 'newbie',
      status: 'Live',
      id: 2,
    },
    {
      img: AppImages.HOME1,
      title: 'Rugged Horizon Quest',
      data: '22-04-24',
      time: '06:00 AM',
      capacity: 4,
      position: 'newbie',
      status: 'Live',
      id: 3,
    },
    {
      img: AppImages.HOME2,
      title: 'Offbeat Overland Voyage',
      data: '22-04-24',
      time: '06:00 AM',
      capacity: 5,
      position: 'newbie',
      status: 'Live',
      id: 4,
    },
  ]);

  const [arrowRotation, setArrowRotation] = useState(new Animated.Value(0));

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });

    Animated.timing(arrowRotation, {
      toValue: expandedItems.includes(index) ? 1 : 0,
      duration: 300, // Adjust duration as needed
      easing: Easing.circle,
      useNativeDriver: true, // Set to true if possible, it improves performance
    }).start();
  };


  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header leftIcon={false} title="My Trips" rightIcon={AppImages.REFRESH} />

      <View row centerV>
        <View flex>
          <TextField
            fieldStyle={[styles.field, {width: '100%'}]}
            placeholder={'Search'}
            placeholderTextColor={'#999999'}
            style={styles.text}
            paddingH-20
            marginT-25
            marginB-20
            leadingAccessory={
              <Image
                source={AppImages.SEARCH}
                width={20}
                height={20}
                marginR-10
              />
            }
          />
        </View>

        <View style={{flex: 0.3}} right>
          <TouchableOpacity onPress={()=>dispatch({type: 'IS_FILTER', payload: true})}>
          <Image source={AppImages.FILTER} width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>

      <View row marginB-20>
        <Chip
          label={'My Trips'}
          onPress={() => setChip(1)}
          labelStyle={[styles.chipLabel, chip == 1 && {color: 'black'}]}
          containerStyle={[
            styles.chip,
            chip == 1 && {backgroundColor: 'white'},
          ]}
        />
        <Chip
          label={'Created Trips'}
          onPress={() => setChip(2)}
          labelStyle={[styles.chipLabel, chip == 2 && {color: 'black'}]}
          containerStyle={[
            styles.chip,
            chip == 2 && {backgroundColor: 'white'},
          ]}
        />
        <Chip
          label={'Closed Trips'}
          onPress={() => setChip(3)}
          labelStyle={[styles.chipLabel, chip == 3 && {color: 'black'}]}
          containerStyle={[
            styles.chip,
            chip == 3 && {backgroundColor: 'white'},
          ]}
        />
      </View>

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteNames.TripDetails)}>
              <View style={styles.view}>
                <ImageBackground
                  source={item.img}
                  style={{width: '100%', height: 150}}
                  imageStyle={{
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  <View row margin-20>
                    <Text style={styles.viewText}>{item.title}</Text>
                    <View flex right>
                      <Text style={styles.date}>{item.data}</Text>
                      <Text style={styles.date}>{item.time}</Text>
                    </View>
                  </View>

                  <View flex right centerV margin-20>
                    <Image source={AppImages.SHARE} width={30} height={30} />
                  </View>

                  <TouchableOpacity
                    style={styles.arrow}
                    onPress={() => toggleExpand(index)}>
                    <Animated.Image
                      source={
                        expandedItems[index] ? AppImages.UP : AppImages.DOWN
                      }
                      style={{
                        transform: [
                          {
                            rotate: arrowRotation.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0deg', '360deg'],
                            }),
                          },
                        ],
                      }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
                <View row padding-15>
                  <View row left flex>
                    <Text style={styles.text1}>{item.position}</Text>
                    <View></View>
                  </View>

                  <View row flex center>
                    <Text style={styles.text1}>Capacity</Text>
                    <View style={styles.capView}>
                      <Text style={styles.capty}>{item.capacity}/10</Text>
                    </View>
                  </View>

                  <View row right flex centerV>
                    <Text style={styles.text1}>Status</Text>
                    <View style={styles.statusView}>
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  </View>
                </View>
                {expandedItems[index] && (
                  <View style={styles.bottomView}>
                    <View row marginB-10>
                      <Text style={styles.rightText}>Organizer</Text>
                      <Text style={styles.leftText}>David</Text>
                    </View>

                    <View row marginB-10>
                      <Text style={styles.rightText}>Meeting Time</Text>
                      <Text style={styles.leftText}>06:00 AM</Text>
                    </View>

                    <View row marginB-10>
                      <Text style={styles.rightText}>Trip Date</Text>
                      <Text style={styles.leftText}>19-March-2024</Text>
                    </View>

                    <View row marginB-10>
                      <Text style={styles.rightText}>City</Text>
                      <Text style={styles.leftText}>Abu Dhabi</Text>
                    </View>

                    <View row marginB-10>
                      <Text style={styles.rightText}>Area</Text>
                      <Text style={styles.leftText}>Sweihan</Text>
                    </View>

                    <View row marginB-10>
                      <Text style={styles.rightText}>Joining deadline</Text>
                      <Text style={styles.leftText}>22-June-2024 11:00 AM</Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      
    </View>
  );
};
export default MyTripScreen;
