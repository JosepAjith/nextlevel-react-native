import React, {useState} from 'react';
import {Button, Checkbox, Image, Text, View} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AppImages from '../../constants/AppImages';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import { getDateTime } from '../../constants/commonUtils';
import moment from 'moment';

interface Props {
  deadline: any;
}

const Attendance = ({deadline}: Props) => {
  const currentDate = moment(new Date(), 'DD-MM-YYYY h:mm A')
  const [mark, setMark] = useState(false);
  const {type} = useSelector((state: RootState) => state.GlobalVariables);
  return (
    <>
      {type == 'user' ? (
        (currentDate.isAfter(deadline)) ?
        <View style={styles.deadline}>
          <View row center marginH-20>
            <Image
              source={AppImages.DEADLINE}
              width={24}
              height={24}
              marginR-10
            />
            <Text style={styles.text2}>
              "Deadline over you can't join the trip"
            </Text>
          </View>
        </View> : <View/>
      ) : (
        <View style={styles.deadline}>
          <View row marginH-15>
            <View backgroundColor="#00A1FC" style={styles.smallView}>
              <Image
                source={AppImages.UPDATE}
                width={24}
                height={24}
                marginR-5
              />
              <Text style={styles.text2}>Edit Trip</Text>
            </View>

            <View backgroundColor="#FF6565" style={styles.smallView}>
              <Image
                source={AppImages.CANCEL}
                width={18}
                height={18}
                marginR-5
              />
              <Text style={styles.text2}>Close Trip</Text>
            </View>

            <View backgroundColor="#FA2D2D" style={styles.smallView}>
              <Image
                source={AppImages.CANCEL}
                width={18}
                height={18}
                marginR-5
              />
              <Text style={styles.text2}>Cancel Trip</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View row centerV marginH-20>
            <View flex left>
              <Text style={styles.text2}>Attendance List</Text>
            </View>

            <TouchableOpacity
              onPress={() => setMark(!mark)}
              style={styles.attdView}>
              <Text style={styles.text2}>Mark Attendance</Text>
            </TouchableOpacity>
          </View>

          {mark && (
            <View marginH-20 marginT-10>
              <Checkbox
                label="peter"
                labelStyle={styles.text2}
                color="white"
                style={{borderRadius: 2}}
                containerStyle={{marginBottom: 20}}
              />
              <Checkbox
                label="peter"
                labelStyle={styles.text2}
                color="white"
                style={{borderRadius: 2}}
                containerStyle={{marginBottom: 20}}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Attendance;
