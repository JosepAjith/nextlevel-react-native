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
    },
    modal: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation:10,
      },
      divider:{
        borderBottomColor:'rgba(0,0,0,0.5)',
        borderBottomWidth:1,
      },
      alertTitle:{
        fontSize:16,
        fontFamily:AppFonts.BOLD,
        color:'black'
    },
    alert:{
        fontSize:14,
        fontFamily:AppFonts.MEDIUM,
        color:'black'
    },
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
    version:{
        fontSize:13,
        fontFamily:AppFonts.MEDIUM,
        color:'white'
    },
});

