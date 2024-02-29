import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

export const styles = StyleSheet.create({
    heading:{
        fontSize:20,
        fontFamily:AppFonts.BOLD,
        color:'white'
    },
    textInputContainer: {
        marginBottom: 30,
      },
      roundedTextInput: {
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor:'rgba(217,217,217,0.2)',
        borderColor:'white'
      },
      text:{
        fontSize:13,
        color:'white',
        opacity:0.5,
        fontFamily:AppFonts.INTER_MEDIUM,
        textAlign:'auto'
      }
})