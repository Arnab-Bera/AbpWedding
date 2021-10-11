import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  Appearance,
} from 'react-native';
import Moment from 'moment';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import styles, {ThemeColors} from '../styles/main.style';
import FlushMsg from '../utils/FlushMsg';
import {Apis} from '../utils/Apis';
import Loader from '../utils/Loader';

const yearList = ['Cancel', '2019', '2020', '2021'];
const monthList = [
  'Cancel',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {listKey: [], count: 0, source: []};
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', async () => {
      console.log('willFocus runs');
    });
    this.setState(
      {
        listKey: [],
        listData: [],
        setYear: Moment().format('Y'),
        setMonth: Moment().format('MMMM'),
        screenHeight: Dimensions.get('screen').height,
        screenWidth: Dimensions.get('screen').width,
        theme: Appearance.getColorScheme(),
      },
      () => {
        console.log('screenHeight: ', this.state.screenHeight);
        console.log('screenWidth: ', this.state.screenWidth);
        console.log('theme: ', this.state.theme);
        this.getListApi();
      },
    );
    Dimensions.addEventListener('change', () => {
      this.setState(
        {
          screenHeight: Dimensions.get('screen').height,
          screenWidth: Dimensions.get('screen').width,
        },
        () => {
          console.log('screenHeight: ', this.state.screenHeight);
          console.log('screenWidth: ', this.state.screenWidth);
        },
      );
    });
    Appearance.addChangeListener(({colorScheme}) => {
      console.log(colorScheme);
      this.setState({theme: colorScheme});
    });
  }

  loaderShowHide = status => {
    this.setState({
      apiLoader: status,
    });
  };

  getListApi = () => {
    this.loaderShowHide(true);
    let api =
      '2180746/' +
      this.state.setYear +
      '/' +
      Moment(this.state.setMonth, 'MMMM').format('M') +
      '/0.json';
    Apis.callGetApis(api, null).then(
      function (result) {
        this.loaderShowHide(false);
        console.log(
          'result.activityDocuments',
          Object.keys(result.activityDocuments).length,
        );
        if (Object.keys(result.activityDocuments).length > 0) {
          console.log('11111');
          this.setState(
            {
              listKey: [...Object.keys(result.activityDocuments)],
              listData: [...Object.values(result.activityDocuments)],
            },
            () => {
              console.log('listDatalistDatalistData: ', this.state.listData);
            },
          );
        } else {
          console.log('22222');
          let data = [];
          this.setState({
            listKey: [...data],
            listData: [...data],
          });
        }
      }.bind(this),
      function () {
        //console.log('There was an error fetching the time');
        this.loaderShowHide(false);
        let data = [];
        this.setState({
          listKey: [...data],
          listData: [...data],
          loading: false,
          ended: true,
        });
        FlushMsg.showError(
          'There was an error fetching the time, please try again later.',
        );
      }.bind(this),
    );
  };

  // renderHeader = () => (

  // );

  renderData = ({item, index}) => (
    <View
      style={{
        marginLeft: 10,
        marginRight: 10,
      }}>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={{marginBottom: 15}}>
          <Text style={styles.HeadingText}>
            {Moment(parseInt(item)).format('MMMM DD, Y')}
          </Text>
        </View>
        {this.state.listData[index].map((item, index) => (
          <View style={[styles.Row, {marginBottom: 15}]}>
            <View style={[styles.Icon, {marginRight: 10}]}>
              <Image
                style={{width: 64, height: 64}}
                source={require('../images/icon.png')}
              />
            </View>
            <View>
              <Text style={[styles.NormalText, {marginBottom: 5}]}>
                {item.actionTypeLabel}
              </Text>
              <View style={{width: '90%'}}>
                <Text style={[styles.SecondaryText, {marginBottom: 5}]}>
                  {item.description}
                </Text>
              </View>
              <Text style={[styles.SmallText, {marginBottom: 2}]}>
                {Moment(parseInt(item.createdOn)).format('hh:mm A')}
              </Text>
            </View>
          </View>
        ))}
      </TouchableOpacity>
    </View>
  );

  /**
   * render() this the main function which used to display different view
   * and contain all view related information.
   */
  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: ThemeColors.primaryColor}} />
        {this.state.apiLoader && <Loader />}
        <SafeAreaView>
          <View style={{marginBottom: 50}}>
            <View style={styles.FlatListContainer}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: '50%',
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.NormalText,
                      {marginRight: 10, color: ThemeColors.lightgreyColor},
                    ]}>
                    Year
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.Dropbx}
                    onPress={() => this.ActionSheetYear.show()}>
                    <Text
                      style={{color: ThemeColors.darkgreyColor, fontSize: 14}}>
                      {this.state.setYear}
                    </Text>
                    <Image
                      style={styles.Droparrow}
                      source={require('../images/droparrow.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '50%',
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.NormalText,
                      {marginRight: 10, color: ThemeColors.lightgreyColor},
                    ]}>
                    Month
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.Dropbx}
                    onPress={() => this.ActionSheetMonth.show()}>
                    <Text
                      style={{color: ThemeColors.darkgreyColor, fontSize: 14}}>
                      {this.state.setMonth}
                    </Text>
                    <Image
                      style={styles.Droparrow}
                      source={require('../images/droparrow.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.listKey.length > 0 ? (
                <FlatList
                  key={'_'}
                  horizontal={false}
                  numColumns={1}
                  ListHeaderComponent={this.renderHeader}
                  data={this.state.listKey}
                  renderItem={this.renderData}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View
                  style={{
                    height: '85%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      styles.SmallText,
                      {
                        textAlign: 'center',
                        fontSize: 14,
                      },
                    ]}>
                    No Records Found.{'\n'}Select a different time range and try
                    again
                  </Text>
                </View>
              )}
            </View>
          </View>
          <ActionSheet
            ref={o => (this.ActionSheetYear = o)}
            title={
              <Text style={{color: '#4A4B4D', fontSize: 18}}>Select Year</Text>
            }
            tintColor={ThemeColors.primaryColor}
            options={yearList}
            cancelButtonIndex={0}
            destructiveButtonIndex={0}
            onPress={actionIndex => {
              console.log('itemIndex', actionIndex);
              actionIndex > 0 &&
                this.setState({setYear: yearList[actionIndex]}, () => {
                  this.getListApi();
                });
            }}
          />
          <ActionSheet
            ref={o => (this.ActionSheetMonth = o)}
            title={
              <Text style={{color: '#4A4B4D', fontSize: 18}}>Select Month</Text>
            }
            tintColor={ThemeColors.primaryColor}
            options={monthList}
            cancelButtonIndex={0}
            destructiveButtonIndex={0}
            onPress={actionIndex => {
              console.log('itemIndex', this.state.itemIndex);
              actionIndex > 0 &&
                this.setState({setMonth: monthList[actionIndex]}, () => {
                  this.getListApi();
                });
            }}
          />
        </SafeAreaView>
      </>
    );
  }
}

export default MainScreen;
