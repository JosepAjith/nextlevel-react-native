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
import {ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import CarouselView from '../../components/CarousalView';

const {TextField} = Incubator;

export type TripDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'TripDetails'
>;

export type TripDetailsRouteProps = RouteProp<RootStackParams, 'TripDetails'>;

interface Props {}

const TripDetails: React.FC<Props> = () => {
  const navigation = useNavigation<TripDetailsNavigationProps>();

  return (
    <View flex backgroundColor={AppColors.Black}>
      <View padding-20>
        <Header title="Trip Details" rightIcon={AppImages.REFRESH} />
      </View>

      <CarouselView />

      <ScrollView>
        <View flex padding-20>
          <View row centerV>
            <View flex row centerV>
              <Text style={styles.title}>Mud & Glory Safari</Text>
              <View style={styles.statusView}>
                <Text style={styles.statusText}>Live</Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#F99933',
                padding: 10,
                borderRadius: 5,
              }}>
              <Image source={AppImages.GROUP} height={9} width={14} />
            </View>
          </View>

          <View row centerV marginV-10>
            <View flex row centerV>
              <Text style={styles.text1}>Capacity</Text>
              <View style={styles.capView}>
                <Text style={styles.capty}>2/10</Text>
              </View>
            </View>

            <View>
              <Text style={styles.text1}>Newbie</Text>
            </View>
          </View>

          <View>
            <Text style={styles.descrip}>
              "Mud & Glory Safari" is not just an off-road adventure; it's a
              daring expedition that beckons thrill-seekers to embark on a
              journey where mud-splattered terrains meet the triumph of
              conquering nature's obstacles.
            </Text>
          </View>

          <View marginV-20>
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
          

          <View row>
            <View style={styles.yellowButton}>
                <Text style={styles.text2}>Support Sign in</Text>
            </View>

            <View style={styles.whiteButton}>
                <Text style={[styles.text2,{color:'black'}]}>Maybe</Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default TripDetails;
