import { StyleSheet } from "react-native";
import AppColors from "../../constants/AppColors";
import AppFonts from "../../constants/AppFonts";

export const styles = StyleSheet.create({
    title:{
        fontSize:27,
        fontFamily:AppFonts.BOLD,
        color:'white',
        lineHeight:31,
        width:'70%'
    },
    notifView:{
        width:48,
        height:48,
        borderRadius:24,
        backgroundColor:'rgba(255, 255, 255, 0.2)',
    }
})