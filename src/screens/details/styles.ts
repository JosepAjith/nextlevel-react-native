import {StyleSheet} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

export const styles = StyleSheet.create({
    statusText: {
        fontSize: 10,
        fontFamily: AppFonts.MEDIUM,
        color: AppColors.Black,
      },
      statusView:{
        backgroundColor:'#BBFD79',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:15,
        marginLeft:10
      },
      title: {
        fontSize: 16,
        fontFamily: AppFonts.BOLD,
        color: "white",
      },
      capty: {
        fontSize: 10,
        fontFamily: AppFonts.REGULAR,
        color: 'white',
      },
      capView:{
        backgroundColor:AppColors.Orange,
        paddingHorizontal:10,
        paddingVertical:5,
        marginLeft:10,
        borderRadius:15
      },
      text1: {
        fontSize: 12,
        fontFamily: AppFonts.REGULAR,
        color: "white",
      },
      descrip: {
        fontSize: 14,
        fontFamily: AppFonts.REGULAR,
        color: "#FAFAFF",
        lineHeight:18,
        textAlign:'justify'
      },
      rightText: {
        fontSize: 13,
        fontFamily: AppFonts.MEDIUM,
        color: "white",
        flex:1
      },
      leftText: {
        fontSize: 13,
        fontFamily: AppFonts.REGULAR,
        color: "#FAFAFF",
        flex:1,
        opacity:0.7
      },
      yellowButton:{
backgroundColor:AppColors.Orange,
paddingHorizontal:20,
paddingVertical:10,
borderRadius:5
      },
      whiteButton:{
backgroundColor:'white',
paddingHorizontal:20,
paddingVertical:10,
borderRadius:5,
marginLeft:20
      },
      text2: {
        fontSize: 13,
        fontFamily: AppFonts.REGULAR,
        color: "white",
      },
});
