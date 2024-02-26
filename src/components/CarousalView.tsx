import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {  Image, Text, View } from 'react-native-ui-lib';
import { Dimensions, FlatList, ImageBackground, StyleSheet,} from 'react-native';
import AppImages from '../constants/AppImages';
import AppFonts from '../constants/AppFonts';


const CarouselView = ({}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const carouselWidth = windowWidth ; 
  const carouselHeight = windowHeight * 0.2;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([
        {
          id: 1,
          image: AppImages.DETAILS
        },
        {
          id: 2,
          image: AppImages.DETAILS
        },
        {
          id: 3,
          image: AppImages.DETAILS
        },
      ]);


    return (
        <View>
        <Carousel
        width={carouselWidth}
        height={carouselHeight}
        autoPlay={true}
        data={images}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
       <ImageBackground source={item.image} style={{width:'100%', height:170,alignSelf:'center'}} imageStyle={{borderRadius:5}}>
          <View flex row centerH bottom marginB-20>
                {images.map((item, index) => (
                    <View key={index} style={[styles.dot, { backgroundColor: index === currentIndex ? 'white' : 'transparent' }]} />
                ))}
            </View>
       </ImageBackground>
        )}
    />
    
    
    </View>
    )
}

const styles = StyleSheet.create({
  dot:{
    width:12,
    height:12,
    borderRadius:10,
    marginHorizontal:3,
    borderColor:'white',
    borderWidth:1
  }
})

export default CarouselView;