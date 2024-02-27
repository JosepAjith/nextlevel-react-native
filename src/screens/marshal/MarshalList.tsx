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
import AppImages from '../../constants/AppImages';
import {Dimensions, FlatList} from 'react-native';
import {Header} from '../../components/Header';
import {useDispatch} from 'react-redux';
import {styles} from '../mytrip/styles';

const {TextField} = Incubator;

export type MarshalListNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MarshalList'
>;

export type MarshalListRouteProps = RouteProp<RootStackParams, 'MarshalList'>;

interface Props {}

const MarshalList: React.FC<Props> = () => {
  const navigation = useNavigation<MarshalListNavigationProps>();
  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 50) / 2;
  const [data, setData] = useState([
    {
      img: AppImages.USER1,
      name: 'Mud Maverick',
      email: 'maverick.44x@gmail.com',
      role: 'newbie',
      id: 1,
    },
    {
      img: AppImages.USER2,
      name: 'Mud Maverick',
      email: 'maverick.44x@gmail.com',
      role: 'newbie',
      id: 2,
    },
    {
      img: AppImages.USER1,
      name: 'Mud Maverick',
      email: 'maverick.44x@gmail.com',
      role: 'newbie',
      id: 3,
    },
    {
      img: AppImages.USER2,
      name: 'Mud Maverick',
      email: 'maverick.44x@gmail.com',
      role: 'newbie',
      id: 4,
    },
  ]);

  return (
    <View flex backgroundColor={AppColors.Black} padding-20>
      <Header title="Marshals" rightIcon={AppImages.REFRESH} />

      <TextField
        fieldStyle={[styles.field, {width: '100%'}]}
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
        numColumns={2}
        renderItem={({item, index}) => {
            const isEvenIndex = index % 2 === 0;
            const alignmentStyle = isEvenIndex ? 'flex-start' : 'flex-end';
          return (
            <View style={{ alignItems: alignmentStyle, flex:1 }}>
                <View style={{width:itemWidth}}>
              <Image source={item.img} style={{width: '100%', height: 100}} />
              <Text white>{item.name}</Text>
              <Text white>{item.email}</Text>
              <Text white>{item.role}</Text>

              <View>
                <Text>Update Role</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default MarshalList;
