import {Image, Text, View} from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import AppStyles from '../constants/AppStyles';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
}

export const Header = ({title}: Props) => {
  const navigation = useNavigation();
  return (
    <View row centerV>
      <View flex>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={AppImages.BACK} />
        </TouchableOpacity>
      </View>
      <View flex center>
        <Text style={AppStyles.title}>{title}</Text>
      </View>

      <View flex></View>
    </View>
  );
};
