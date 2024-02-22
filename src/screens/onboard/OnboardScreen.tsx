import React, {useRef, useState} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {RootStackParams} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../navigation';
import AppImages from '../../constants/AppImages';
import AppColors from '../../constants/AppColors';
import PagerView from 'react-native-pager-view';
import {styles} from './styles';
import {ImageBackground, TouchableOpacity} from 'react-native';

export type OnboardScreenNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'OnboardScreen'
>;

export type OnboardScreenRouteProps = RouteProp<
  RootStackParams,
  'OnboardScreen'
>;

interface Props {}

const OnboardScreen: React.FC<Props> = () => {
  const navigation = useNavigation<OnboardScreenNavigationProps>();
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const onPageSelected = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage == 3) {
      navigation.replace(RouteNames.LoginScreen);
    } else {
      pagerRef.current?.setPage(nextPage);
    }
  };

  const renderIndicator = (pageIndex: number) => {
    return (
      <TouchableOpacity
        key={pageIndex}
        onPress={() => pagerRef.current?.setPage(pageIndex)}>
        <View
          style={[
            styles.indicator,
            currentPage === pageIndex && styles.activeIndicator,
          ]}
        />
      </TouchableOpacity>
    );
  };

  const renderOnboardPage = (key: string, source: any, text: string) => (
    <ImageBackground key={key} source={source} style={{ padding: 20 }}>
      <View right>
        <TouchableOpacity onPress={() => navigation.navigate(RouteNames.LoginScreen)}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View marginV-20>
        <Text style={styles.hello}>Hello!</Text>
        <Text style={styles.skip}>{text}</Text>
      </View>
      <View flex centerV>
        <Image source={AppImages.NXTLEVEL} />
      </View>
      <View row centerV marginB-40>
        <View flex row>
          {renderIndicator(0)}
          {renderIndicator(1)}
          {renderIndicator(2)}
        </View>
        <TouchableOpacity onPress={goToNextPage}>
          <View right center style={styles.circle}>
            <Image source={AppImages.NEXT} />
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <PagerView
      ref={pagerRef}
      style={styles.pagerView}
      initialPage={0}
      orientation={'horizontal'}
      onPageSelected={onPageSelected}>
      {renderOnboardPage('1', AppImages.ONBOARD1, 'Hit the road, conquer the trails, and create stories that will last a lifetime.')}
      {renderOnboardPage('2', AppImages.ONBOARD2, 'Share your experiences, exchange tips, and meet like-minded adventurers.')}
      {renderOnboardPage('3', AppImages.ONBOARD3, 'Customize your trips, from off-road trails to cozy campsites.')}
    </PagerView>
  );
};
export default OnboardScreen;
