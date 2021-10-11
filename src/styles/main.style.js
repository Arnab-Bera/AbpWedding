import {StyleSheet, PixelRatio, Dimensions} from 'react-native';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

export const ThemeColors = {
  primaryColor: '#650202',
  secondaryColor: '#B71C1C',
  darkgreyColor: '#333333',
  lightgreyColor: '#A0A0A0',
  offwhiteColor: '#F0F0F6',

  whiteColor: '#ffffff',
  blackColor: '#000000',
  // redColor: '#e21313',
  // greenColor: '#0AC725',
  // blueColor: '#1DBCF3',
  // orangeColor: '#FF9900',
};

export default StyleSheet.create({
  FlatListContainer: {
    backgroundColor: ThemeColors.offwhitweColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    width: '100%',
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Dropbx: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: ThemeColors.darkgreyColor,
    // borderWidth: 1,
    justifyContent: 'space-between',
    width: '60%',
    padding: 5,
    marginTop: 5,
    borderRadius: 6,
    marginBottom: 5,
  },
  Droparrow: {
    width: 12,
    height: 6,
  },
  HeadingText: {
    fontSize: 15,
    color: ThemeColors.secondaryColor,
    fontWeight: 'bold',
  },
  NormalText: {
    fontSize: 15,
    color: ThemeColors.darkgreyColor,
  },
  SecondaryText: {
    fontSize: 14,
    color: ThemeColors.darkgreyColor,
  },
  SmallText: {
    fontSize: 13,
    color: ThemeColors.lightgreyColor,
  },
});
