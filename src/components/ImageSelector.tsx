import React, {useRef, useState, useEffect} from 'react';
import {Chip, Image, Text, View} from 'react-native-ui-lib';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  PanResponder,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AppStyles from '../constants/AppStyles';
import AppImages from '../constants/AppImages';
import * as ImagePicker from 'react-native-image-picker';
import { showToast } from '../constants/commonUtils';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from 'react-native-image-resizer';
const deviceHeight = Dimensions.get('window').height;

const ImageSelector = (props: {close: any,isItem: any, multi?: any}) => {
  const close = props.close;
  const isItem = props.isItem;
  const multi = props.multi;

  useEffect(() => {
    openModal();
  }, []);

  const modalY = useRef(new Animated.Value(deviceHeight)).current;

  const openModal = () => {
    Animated.timing(modalY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalY, {
        toValue: 300,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        close();
      });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          modalY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(modalY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleImagePicker = async () => {
    try {
      let pickerResult;
      if(multi == true) {
        pickerResult = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          allowMultiSelection: true
        });
      }
      else{
      pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
      });
    }
      isItem(pickerResult)
      closeModal();
    } catch (err) {
      showToast('User canceled directory picker');
    }
  };

  // Function to handle image capturing using the device's camera
  const handleCameraCapture = () => {
    const options = {
      title: 'Take a photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, async (response) => {
      if (response.didCancel) {
        showToast('User cancelled image picker');
      } else if (response.error) {
        showToast('ImagePicker Error: ', response.error);
      } else {
       const responses = response.assets[0];
        ImageResizer.createResizedImage(
          responses.uri,
          800, // max width
          800, // max height
          'JPEG', // output format
          80, // compression quality
        )
          .then(resizedImage => {
            const selectedImage = {
              fileCopyUri: null,
              name: responses.fileName,
              size: responses.fileSize,
              type: responses.type,
              uri: resizedImage.uri,
            };
            isItem([selectedImage]);
          })
          .catch(error => {
            console.log('Image resizing error:', error);
          });
         // Set the selected image URI
        closeModal();
      }
    });
  };

  return (
    <Animated.View
      style={[AppStyles.modal, {transform: [{translateY: modalY}]}]}
      {...panResponder.panHandlers}>
        <View padding-20>
          <Text style={[AppStyles.title,{color:'black'}]}>Select image using : </Text>
          <View row marginV-10>
            <TouchableOpacity onPress={handleCameraCapture} style={{flex:1,alignItems:'center'}}>
              <Image source={AppImages.CAMERA} width={40} height={40}/>
              <Text style={AppStyles.text}>Camera</Text>
           </TouchableOpacity>

            <TouchableOpacity onPress={handleImagePicker} style={{flex:1,alignItems:'center'}}>
            <Image source={AppImages.UPLOAD} width={40} height={40}/>
              <Text style={AppStyles.text}>Upload</Text>
        </TouchableOpacity>
          </View>
        </View>
    </Animated.View>
  );
};

export default ImageSelector;
