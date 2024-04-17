import React from 'react';
import {Button, Image, Text, View} from 'react-native-ui-lib';
import AppStyles from '../constants/AppStyles';
import {TouchableOpacity} from 'react-native';
import {styles} from '../screens/home/styles';

interface Props {
  level: any;
}

const LevelView = ({level}: Props) => {
  return (
    <View style={styles.levelView}>
      {/* newbie */}
      <View
        flex
        style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
        backgroundColor={
          level == 'First Join' || level == 'Get To Gether'
            ? 'transparent'
            : '#F8E9DB'
        }
      />

      {/* newbie+ */}
      <View
        flex
        style={styles.separator}
        backgroundColor={
          level == 'First Join' || level == 'newbie' || level == 'Get To Gether'
            ? 'transparent'
            : '#FDD9B2'
        }
      />

      {/* Intermediate */}
      <View
        flex
        backgroundColor={
          level == 'First Join' ||
          level == 'newbie' ||
          level == 'newbie+' ||
          level == 'Get To Gether' ||
          level == 'Intermediate Exam'
            ? 'transparent'
            : '#F5B978'
        }
      />

      {/* Intermediate+ */}
      <View
        flex
        style={styles.separator}
        backgroundColor={
          level == 'First Join' ||
          level == 'newbie' ||
          level == 'newbie+' ||
          level == 'Intermediate' ||
          level == 'Get To Gether' ||
          level == 'Intermediate Exam'
            ? 'transparent'
            : '#E09544'
        }
      />

      {/* Advanced */}
      <View
        flex
        style={{borderTopRightRadius: 10, borderBottomRightRadius: 10}}
        backgroundColor={
          level == 'First Join' ||
          level == 'newbie' ||
          level == 'newbie+' ||
          level == 'Intermediate' ||
          level == 'Intermediate+' ||
          level == 'Get To Gether' ||
          level == 'Intermediate Exam' ||
          level == 'Advanced Exam'
            ? 'transparent'
            : '#A85D0B'
        }
      />
    </View>
  );
};

export default LevelView;
