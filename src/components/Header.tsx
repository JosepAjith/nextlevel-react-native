import {Image, Text, View} from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import AppStyles from '../constants/AppStyles';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { RouteNames } from '../navigation';

interface Props {
  title: string;
  rightIcon?: any;
  leftIcon?: any;
  rightOnpress?: any;
  isDeepLink?: any
}

export const Header = ({title, rightIcon, leftIcon, rightOnpress, isDeepLink}: Props) => {
  const navigation = useNavigation();
  return (
    <View row centerV>
      <View style={{flex: 0.5}} centerV>
        {leftIcon == false ? (
          <View />
        ) : (
          <TouchableOpacity onPress={() => {isDeepLink ? navigation.replace(RouteNames.BottomTabs) : navigation.goBack()}}>
            <View style={{paddingVertical: 10}}>
              <Image source={AppImages.BACK} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View flex center>
        <Text style={AppStyles.title}>{title}</Text>
      </View>

      <View style={{flex: 0.5}} right>
        {rightIcon && (
          <TouchableOpacity onPress={rightOnpress}>
            <Image source={rightIcon} width={24} height={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
