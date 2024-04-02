import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import AppFonts from '../constants/AppFonts';
import AppColors from '../constants/AppColors';

interface Props{
    visible: any;
    message: any;
    onCancel: any;
    onConfirm: any;
}

const CustomAlert = ({ visible, message, onCancel, onConfirm }: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onCancel()}>
      <View style={{ flex: 1, justifyContent: 'center', marginHorizontal:20, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text style={{ fontSize: 18, marginBottom: 20, fontFamily:AppFonts.MEDIUM, color:'black' }}>{message}</Text>
          <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity onPress={onCancel} style={{backgroundColor:'black', flex:1, alignItems:'center', padding:5, borderRadius:5}}>
              <Text style={{ fontSize: 16, color: 'white', fontFamily:AppFonts.BOLD }}>Cancel</Text>
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}/>
            <TouchableOpacity onPress={onConfirm} style={{backgroundColor:AppColors.Orange, flex:1, alignItems:'center', padding:5, borderRadius:5}}>
              <Text style={{ fontSize: 16, color: 'black', fontFamily:AppFonts.BOLD }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;