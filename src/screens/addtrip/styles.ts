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
        textDecorationLine:'underline',
        color:AppColors.Orange
    },
});
