import { StyleSheet } from "react-native";
import AppFonts from "../../constants/AppFonts";
import AppColors from "../../constants/AppColors";

export const styles = StyleSheet.create({
card:{
    marginTop:20,
    borderRadius:20,
    padding:10
},
msgView:{
    backgroundColor:'#F2F4F5',
    borderRadius:20,
    borderTopLeftRadius:0,
    padding:20
},
time:{
    color:'#72777A',
    fontSize:12,
    fontFamily:AppFonts.INTER_REGULAR
},
message:{
    color:'#303437',
    fontSize:16,
    fontFamily:AppFonts.INTER_REGULAR,
    lineHeight:24
},
empty:{
    color:'white',
    fontSize:16,
    fontFamily:AppFonts.INTER_MEDIUM,
    lineHeight:24
},
typeView:{
backgroundColor:'white',
borderColor:'#979C9E',
borderWidth:1,
padding:10,
borderRadius:40
},
sendView:{
backgroundColor:AppColors.Orange,
padding:10,
borderRadius:40
}
})