import React, {useState} from 'react';
import {
  Button,
  Checkbox,
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
import ButtonView from '../../components/ButtonView';
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
import AppFonts from '../../constants/AppFonts';

const {TextField} = Incubator;

export type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'HomeScreen'
>;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export type HomeScreenRouteProps = RouteProp<RootStackParams, 'HomeScreen'>;

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
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
      <View row>
        <View flex>
          <Text style={styles.title}>Buckle up and get ready</Text>
        </View>

        <View center style={styles.notifView}>
          <Image source={AppImages.NOTIF} width={18} height={21} />
          {/* <View style={{position:'absolute', right:13, top:12 }}>
          <Image source={AppImages.DOT} width={8} height={8}/>
          </View> */}
        </View>
      </View>

      <TextField
        fieldStyle={styles.field}
        placeholder={'Search'}
        placeholderTextColor={'#999999'}
        style={styles.text}
        paddingH-20
        marginT-25
        marginB-20
        leadingAccessory={
          <Image source={AppImages.SEARCH} width={20} height={20} marginR-10 />
        }
      />

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={()=>navigation.navigate(RouteNames.TripDetails)}>
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
export default HomeScreen;
