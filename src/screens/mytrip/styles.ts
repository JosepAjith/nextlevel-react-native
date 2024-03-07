import {StyleSheet} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

export const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    fontFamily: AppFonts.BOLD,
    color: 'white',
    lineHeight: 31,
    width: '70%',
  },
  notifView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  field: {
    borderWidth: 1,
    borderColor: AppColors.Stroke,
    borderRadius: 16,
    height: 50,
  },
  text: {
    color: '#999999',
    fontSize: 14,
    fontFamily: AppFonts.REGULAR,
  },
  view: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  viewText: {
    fontSize: 14,
    fontFamily: AppFonts.BOLD,
    color: 'white',
    borderLeftColor: 'white',
    borderLeftWidth: 1,
    width: 100,
    paddingLeft: 10,
  },
  date: {
    fontSize: 14,
    fontFamily: AppFonts.MEDIUM,
    color: 'white',
  },
  arrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -10,
  },
  text1: {
    fontSize: 14,
    fontFamily: AppFonts.REGULAR,
    color: AppColors.Black,
  },
  capty: {
    fontSize: 10,
    fontFamily: AppFonts.REGULAR,
    color: 'white',
  },
  capView: {
    backgroundColor: AppColors.Black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 10,
    fontFamily: AppFonts.MEDIUM,
    color: AppColors.Black,
  },
  statusView: {
    backgroundColor: '#BBFD79',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  leftText: {
    fontSize: 12,
    fontFamily: AppFonts.REGULAR,
    color: '#000000',
    flex: 1,
  },
  rightText: {
    fontSize: 12,
    fontFamily: AppFonts.MEDIUM,
    color: '#000000',
    flex: 1,
  },
  bottomView: {
    borderTopColor: AppColors.Orange,
    borderTopWidth: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  chip: {
    borderColor: 'white',
    borderWidth: 1,
    marginRight:20
  },
  chipLabel:{
    fontSize:12,
    fontFamily:AppFonts.REGULAR,
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
  divider:{
    borderBottomColor:'rgba(0,0,0,0.5)',
    borderBottomWidth:1,
  },
  name:{
    fontSize:13,
    fontFamily:AppFonts.INTER_SEMIBOLD,
    color:'white'
  },
  email:{
    fontSize:10,
    fontFamily:AppFonts.INTER_REGULAR,
    color:'#FAFAFF',
    opacity:0.7
  },
  marshalView:{
    backgroundColor:'#222222',
    opacity:0.8,
    borderRadius:5,
    marginBottom:10
  },
  role:{
    backgroundColor:'white',
    borderRadius:5,
    paddingVertical:5,
    paddingHorizontal:10,
    marginTop:10,
    height:30,
    width:'90%'
  },
  roleText:{
    fontSize:12,
    fontFamily:AppFonts.INTER_MEDIUM,
    color:'black',
  },
});
