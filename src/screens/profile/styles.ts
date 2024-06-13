import {StyleSheet} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

export const styles = StyleSheet.create({
    imageView:{
        width:72,
        height:72,
        borderRadius:36,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    name:{
        fontSize:18,
        fontFamily:AppFonts.BOLD,
        color:'white',
    },
    rank:{
        fontSize:18,
        fontFamily:AppFonts.REGULAR,
        color:'white',
    },
    middle:{
        backgroundColor:AppColors.Grey,
        borderRadius:20,
        padding:20,
        marginBottom:20
    },
    middle1:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    inner:{
        paddingVertical:5,
        borderRadius:5,
        flex:1,
    },
    tabText:{
            fontSize:12,
            fontFamily:AppFonts.INTER_SEMIBOLD,
            marginHorizontal:10
    },
    view:{
        backgroundColor:AppColors.Grey,
        borderRadius:20,
    },
    text:{
        fontSize:12,
        fontFamily:AppFonts.MEDIUM,
        color:'white',
    },
    divider:{
        borderBottomColor:'rgba(255,255,255,0.2)',
        borderBottomWidth:1,
        padding:20
    },
    carText:{
        fontSize:14,
        fontFamily:AppFonts.REGULAR,
        color:'#979797'
    },
    carTitle:{
        fontSize:30,
        fontFamily:AppFonts.MEDIUM,
        color:'white'
    },
    top:{
        backgroundColor:AppColors.Grey,
        right:20,
        marginBottom:20
    },
    border:{
        borderLeftColor:'rgba(255,255,255,0.2)',
        borderLeftWidth:1,
        borderRightColor:'rgba(255,255,255,0.2)',
        borderRightWidth:1,
    },
    smallView:{
        flex:1,
        paddingVertical:15,
        alignItems:'center',
        justifyContent:'center'
    },
    plus:{
        backgroundColor:'white',
        alignSelf:'center',
        padding:10,
        borderRadius:5,
        marginTop:20
    },
    car:{
        fontSize:14,
        fontFamily:AppFonts.INTER_REGULAR,
        color:'black',
        marginRight:20
    },
    role:{
        backgroundColor:'white',
        borderRadius:5,
        paddingVertical:5,
        paddingHorizontal:10,
        marginVertical:10,
        height:35,
        width:'40%',
        top:30
      },
      roleText:{
        fontSize:12,
        fontFamily:AppFonts.INTER_MEDIUM,
        color:'black',
      },
});

