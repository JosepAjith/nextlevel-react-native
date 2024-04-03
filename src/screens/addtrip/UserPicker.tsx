import React, { useState } from "react";
import { Checkbox, Image, Incubator, Picker, View } from "react-native-ui-lib";
import AppImages from "../../constants/AppImages";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { fetchUserList } from "../../api/user/UserListSlice";
import AppColors from "../../constants/AppColors";
import { Header } from "../../components/Header";
import BackgroundLoader from "../../components/BackgroundLoader";
import { Dimensions, FlatList, Text, TouchableOpacity } from "react-native";
import { styles } from "../mytrip/styles";
const {TextField} = Incubator;

const UserPicker = ({route}: any) => {
    const windowWidth = Dimensions.get('window').width;
    const level= route.params.level;
  const itemWidth = (windowWidth - 50) / 2;
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    const {users, loadingUsers, usersError} = useSelector(
      (state: RootState) => state.UserList,
    );
    useFocusEffect(
        React.useCallback(() => {
          FetchList(1);
    
          return () => {
            setUserList([]);
          };
        }, [search]),
      );

      const FetchList = (page: number) => {
          let request = JSON.stringify({
            level: level == 'Intermediate Exam' ? ['newbie+'] : level == 'Advance Exam' ? ['Intermediate+'] : [level],
            page: page,
            title: search,
          });
          dispatch(fetchUserList({requestBody: request}))
            .then((response: any) => {
              if (page === 1) {
                setUserList(response.payload.users.data);
              } else {
                // Concatenate the new trips with the existing list
                setUserList(prevList =>
                  prevList.concat(response.payload.users.data),
                );
              }
            })
            .catch((error: any) => {
              // Handle error
            });
      };

      const loadMoreTrips = () => {
        if (users?.total_page && users?.page < users?.total_page) {
          const nextPage = users.page + 1;
          FetchList(nextPage);
        }
      };
      
    return(
        <View flex backgroundColor={AppColors.Black}>
        <View flex padding-20>
          <Header
            title="User List"
            rightIcon={AppImages.REFRESH}
            rightOnpress={() => {
              setSearch('');
              setUserList([]);
              FetchList(1);
            }}
          />
  
          {loadingUsers && <BackgroundLoader />}
  
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
                value={search}
                onChangeText={text => setSearch(text)}
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
  
          </View>
          
          <FlatList
            data={userList}
            renderItem={({item, index}) => {
              return (
                <View marginB-20>
                    <Checkbox
                    label={<View row centerV>
                    <Image
                      source={
                        item.image ? {uri: item.image} : AppImages.PLACEHOLDER
                      }
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                    />
                  
                      <View left marginL-20>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>Level : {item.level}</Text>
                      </View>
                    
                  </View>}
                  color="white"
                  style={{borderRadius: 2}}
                  containerStyle={{marginBottom: 20}}/>
                    
                </View>
              );
            }}
            onEndReached={loadMoreTrips}
          />
        </View>
      </View>
    )
}

export default UserPicker;