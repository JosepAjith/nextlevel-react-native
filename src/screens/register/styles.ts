import { StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";
import AppFonts from "../../constants/AppFonts";

export const styles = StyleSheet.create({
    title:{
        fontSize:16,
        fontFamily:AppFonts.MEDIUM,
        color:'white'
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
    forgot:{
        fontSize:12,
        fontFamily:AppFonts.INTER_REGULAR,
        color:AppColors.Orange
    },
    lineText:{
        textDecorationLine:'underline',
        color:AppColors.Orange
    }
})