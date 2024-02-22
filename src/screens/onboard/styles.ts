import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

export const styles = StyleSheet.create({
pagerView: {
    flex:1
},
indicator:{
width:5,
height:5,
borderRadius:3,
backgroundColor:'white',
marginHorizontal:3
},
activeIndicator:{
    width:20,
    height:5,
    borderRadius:3,
    backgroundColor:'white',
    marginHorizontal:3
},
skip:{
    fontFamily:AppFonts.REGULAR,
    fontSize:18,
    color:'white'
},
hello:{
    fontFamily:AppFonts.BOLD,
    fontSize:30,
    color:'white'
},
circle:{
    height: 80,
    width: 80,
    backgroundColor: AppColors.Black,
    borderRadius: 40,
}
})