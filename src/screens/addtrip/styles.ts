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
        marginVertical:20
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
});
