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
import {ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../components/Header';
import AppFonts from '../../constants/AppFonts';
import useBackHandler from '../../constants/useBackHandler';

const {TextField} = Incubator;

export type AboutScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'AboutScreen'
>;

export type AboutScreenRouteProps = RouteProp<RootStackParams, 'AboutScreen'>;

interface Props {}

const AboutScreen: React.FC<Props> = () => {
  const navigation = useNavigation<AboutScreenNavigationProps>();
  useBackHandler(() => {
    navigation.goBack(); // Navigate back to the previous screen
    return true; // Prevent default behavior
  });

  return (
    <ScrollView style={{backgroundColor: AppColors.Black}}>
      <View flex backgroundColor={AppColors.Black} padding-20>
        <Header title="About" />

        <Text
          marginV-20
          style={{fontSize: 14, fontFamily: AppFonts.BOLD, color: 'white'}}>
          Desert Thrills Await
        </Text>

        <Text style={{fontSize: 12, fontFamily: AppFonts.REGULAR, color: 'white', opacity:0.7,textAlign:'justify'}}>
          Indulge in the awe-inspiring beauty of the desert with NXTLEVEL 4X4,
          where every sand dune holds a story waiting to be discovered. We
          extend a warm invitation for you to join us on a unique and thrilling
          desert experience that transcends the ordinary. At NXTLEVEL 4X4, we go
          beyond the typical off-road excursion by offering comprehensive
          hands-on technical and instructional training. Our mission is to
          empower you with the knowledge and skills to navigate the desert
          terrain safely, instilling both confidence in yourself and trust in
          your vehicle's capabilities. Our team of highly experienced trip
          leaders, known as Marshals, is dedicated to providing personalized
          guidance throughout your journey. Discover the essence of responsible
          off-roading as our seasoned Marshals share their wealth of knowledge,
          accumulated through over 3000 hours of drive experience. We believe
          that proficiency in off-road driving not only enhances your adventure
          but also plays a pivotal role in respecting and preserving the rich
          cultural and ecological tapestry of the desert landscape. The NXTLEVEL
          4x4 Off-Road Group is a diverse community of off-road enthusiasts,
          transcending nationalities and ages. Our team of skilled Marshals is
          equipped to train and mentor individuals, regardless of their prior
          experience. Whether you're a seasoned off-roader or a novice with a
          passion for adventure, we welcome you into our community with open
          arms. Our commitment extends beyond the thrill of the ride – we
          prioritize safety and environmental consciousness. Through our
          training programs, we ensure that every member becomes a safe and
          skilled desert navigator. From mechanical insights to navigating the
          challenging terrain, we equip you with the expertise needed to conquer
          the desert with confidence. Join us in fostering a sense of
          camaraderie and environmental stewardship. NXTLEVEL 4X4 is not just a
          group; it's a community that thrives on the shared love for
          off-roading and a commitment to preserving the beauty of the desert.
          Become part of our off-road family, where every journey is an
          opportunity to learn, grow, and embrace the true spirit of adventure.
        </Text>
      </View>
    </ScrollView>
  );
};
export default AboutScreen;
