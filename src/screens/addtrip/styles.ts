import {StyleSheet} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

export const styles = StyleSheet.create({
    field:{
        borderWidth:1,
        borderColor:AppColors.Stroke,
        borderRadius:16,
        height:50
    },
    label:{
        fontFamily:AppFonts.REGULAR,
        fontSize:15,
        color:'white',
        marginBottom:10
    },
    text:{
        color:'#999999',
        fontSize:14,
        fontFamily:AppFonts.REGULAR
    },
    imageView:{
        borderStyle:'dashed',
        borderWidth:1,
        borderColor:'white',
        height:160,
        borderRadius:20,
        marginVertical:20,
    },
    click:{
        color:'white',
        fontSize:12,
        fontFamily:AppFonts.LATO_REGULAR
    },
    add:{
        color:'white',
        fontSize:13,
        fontFamily:AppFonts.LATO_SEMIBOLD,
        marginVertical:5
    },
    dropdownContainer: {
        position: 'absolute',
        top: '100%', // Position dropdown below the text field
        left: 20, // Adjust the left position according to your UI
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        zIndex: 1,
      },
      dropdownItem: {
        padding: 8,
      },
      forgot:{
        fontSize:12,
        fontFamily:AppFonts.INTER_REGULAR,
        color:AppColors.Orange
    },
    lineText:{
        // textDecorationLine:'underline',
        color:AppColors.Orange
    },
    chip: {
        borderColor: 'white',
        borderWidth: 1,
        marginRight:20
      },
      chipLabel:{
        fontSize:12,
        fontFamily:AppFonts.REGULAR,
        color:'white'
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
        borderRadius:15,
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
        textAlign:'auto'
      },
      statusText: {
        fontSize: 10,
        fontFamily: AppFonts.MEDIUM,
        color: AppColors.Black,
      },
      statusView:{
        // backgroundColor:'#BBFD79',
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
      detailView:{
        backgroundColor:'rgba(61,61,61,0.5)',
        borderRadius:20,
        padding:20,
        marginTop:20
      }
});
