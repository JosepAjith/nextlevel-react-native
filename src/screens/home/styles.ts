import {StyleSheet} from 'react-native';
import AppColors from '../../constants/AppColors';
import AppFonts from '../../constants/AppFonts';

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: AppFonts.BOLD,
    color: 'white',
  },
  sub: {
    fontSize: 12,
    fontFamily: AppFonts.REGULAR,
    color: 'white',
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
    fontSize: 12,
    fontFamily: AppFonts.REGULAR,
    color: AppColors.Black,
  },
  capty: {
    fontSize: 8,
    fontFamily: AppFonts.REGULAR,
    color: 'white',
  },
  capView: {
    backgroundColor: AppColors.Black,
    marginLeft: 5,
    borderRadius: 10,
    marginTop: 5,
    height:16,
    width:50,
  },
  statusText: {
    fontSize: 8,
    fontFamily: AppFonts.MEDIUM,
    color: AppColors.Black,
  },
  statusView: {
    // backgroundColor:'#BBFD79',
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 5,
    width:50,
    height:16,
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
  levelView: {
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderColor: 'black',
    width: 60,
    height: 15,
    borderRadius: 10,
    flexDirection: 'row',
    marginLeft:5,
    marginTop:5
  },
  separator: {
    borderLeftColor: 'black',
    borderLeftWidth: 0.4,
    borderRightColor: 'black',
    borderRightWidth: 0.4,
  },
});
