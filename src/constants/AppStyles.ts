import {StyleSheet} from 'react-native';
import AppColors from './AppColors';
import AppFonts from './AppFonts';


const AppStyles = StyleSheet.create({
    button:{
backgroundColor:AppColors.Orange,
height:50,
borderRadius:8,
justifyContent:'center',
alignItems:'center'
    },
    buttonLabel:{
fontFamily:AppFonts.INTER_BOLD,
fontSize:16,
color:'white'
    },
    title:{
        fontSize:16,
        fontFamily: AppFonts.MEDIUM,
        color:'white'
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
      text:{
        fontSize:16,
        fontFamily: AppFonts.REGULAR,
        color:'black'
    },
});

export default AppStyles;