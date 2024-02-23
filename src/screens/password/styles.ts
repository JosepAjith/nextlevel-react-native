import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

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
    text1:{
        color:AppColors.fill,
        fontFamily:AppFonts.REGULAR,
        fontSize:14,
        lineHeight:20
    }
})