import React, { useEffect, useState } from "react";
import { Checkbox, Image, Incubator, Picker, View } from "react-native-ui-lib";
import AppImages from "../../constants/AppImages";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fetchUserList } from "../../api/user/UserListSlice";
import AppColors from "../../constants/AppColors";
import { Header } from "../../components/Header";
import BackgroundLoader from "../../components/BackgroundLoader";
import { Dimensions, FlatList, Text, TouchableOpacity } from "react-native";
import { styles } from "../mytrip/styles";
import ButtonView from "../../components/ButtonView";
const {TextField} = Incubator;

const UserPicker = ({route}: any) => {
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const level= route.params.level;
    const selectUsers= route.params.selectUsers;
    const onSelectUsers= route.params.onSelectUsers;
  const itemWidth = (windowWidth - 50) / 2;
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const [userList, setUserList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
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

      useEffect(() => {
        if(selectUsers.length != 0){
        // Update selectedUsers when selectUsers changes
        setSelectedUsers(selectUsers);
        }
    }, [selectUsers]);

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
                  style={{borderRadius: 2,}}
                  containerStyle={{marginBottom: 20}}
                  value={selectedUsers.some((user) => user.id === item.id)} // Check if the user is already selected
                //   onValueChange={(isChecked: any) => {
                //     if (selectedUsers.some((user) => user.id === item.id)) {
                //       // If user is already selected, remove it from selectedUsers
                //       setSelectedUsers(selectedUsers.filter((user) => user.id !== item.id));
                //     } else {
                //       // If user is not selected, add it to selectedUsers
                //       setSelectedUsers([...selectedUsers, item]);
                //     }
                //   }}

                  onValueChange={(isChecked: boolean) => {
                    if (isChecked) {
                        // If user is not already selected, add it to selectedUsers
                        setSelectedUsers([...selectedUsers, { id: item.id, name: item.name, image: item.image }]);
                    } else {
                        // If user is selected, remove it from selectedUsers
                        setSelectedUsers(selectedUsers.filter((user) => user.id !== item.id));
                    }
                }}
                  />
                    
                </View>
              );
            }}
          
            onEndReached={loadMoreTrips}
          />

          <ButtonView title="Confirm"  onPress={() => {
              // Pass selectedUsers back to the previous screen
              onSelectUsers(selectedUsers);
              navigation.goBack();
            }}/>
        </View>
      </View>
    )
}

export default UserPicker;