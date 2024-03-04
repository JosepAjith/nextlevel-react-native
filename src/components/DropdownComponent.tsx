import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from 'react-native-ui-lib';
import AppImages from '../constants/AppImages';
import AppColors from '../constants/AppColors';
import AppFonts from '../constants/AppFonts';

interface Props {
    data: any;
    label: string;
    value: string;
}

const DropdownComponent = ({data, label, value}: Props) => {

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField={label}
      valueField={value}
      placeholder="Select item"
      searchPlaceholder="Search..."
      onChange={item => {
        console.log(item.value);
      }}
      renderRightIcon={() => (
        <Image
        source={AppImages.DOWN}
        tintColor="#3F4E59"
        width={11}
        height={6}
      />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth:1,
    borderColor:AppColors.Stroke,
    borderRadius:16,
    height:50,
    marginBottom:20,
    paddingHorizontal:20
  },
  placeholderStyle: {
    color:'#999999',
        fontSize:14,
        fontFamily:AppFonts.REGULAR
  },
  selectedTextStyle: {
    color:'#999999',
    fontSize:14,
    fontFamily:AppFonts.REGULAR
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});