import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

export const styles = StyleSheet.create({
    text:{
        fontSize:16,
        color: 'white',
        fontFamily:AppFonts.INTER_BOLD
    },
    text1:{
        fontSize:16,
        color:'#B1B1B1',
        fontFamily:AppFonts.INTER_REGULAR,
        textAlign:'center'
    },
    notifText:{
        fontFamily:AppFonts.INTER_MEDIUM,
        fontSize:16,
        color:AppColors.Black,
        textAlign:'auto'
    },
    notifText1:{
        fontFamily:AppFonts.INTER_REGULAR,
        fontSize:14,
        color:AppColors.Black,
        opacity:0.6
    },
    notiFView:{
        backgroundColor:'white',
        borderRadius:13,
        paddingHorizontal:20,
        paddingVertical:10,
        marginBottom:20
    }
})