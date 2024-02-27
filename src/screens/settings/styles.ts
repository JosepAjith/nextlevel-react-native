import {StyleSheet} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

export const styles = StyleSheet.create({
    title:{
        fontSize:14,
        fontFamily:AppFonts.BOLD,
        color:'white'
    },
    name:{
        fontSize:13,
        fontFamily:AppFonts.REGULAR,
        color:'white'
    },
    description:{
        fontSize:11,
        fontFamily:AppFonts.REGULAR,
        color:'white',
        opacity:0.7,
        textAlign:'justify',
        marginBottom:20
    },
    view:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    }
});

