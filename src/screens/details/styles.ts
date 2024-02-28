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
      deadline:{
        backgroundColor:'rgba(61,61,61,0.5)',
        borderRadius:20,
        paddingVertical:20
      },
      divider:{
        borderBottomColor:'white',
        opacity:0.1,
        borderBottomWidth:1,
        marginVertical:10
      },
      smallView:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        padding:5,
        borderRadius:5
      },
      attdView:{
        justifyContent:'center',
        alignItems:'center',
        padding:8,
        borderRadius:5,
        backgroundColor:'rgba(228,228,228,0.6)'
      }
});
