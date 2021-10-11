import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {
  Actions,
  Scene,
  Router,
  Modal,
  Tabs,
  Drawer,
  Stack,
} from 'react-native-router-flux';

import MainScreen from './components/MainScreen';
import styles, {ThemeColors} from './styles/main.style';

let ScreenWidth = Dimensions.get('window').width;
/**
 *  RouterComponent is rendered when that route matches the URL assicated with Component.
 *  initial :- this props Indicate the first Component shown when App launch in device.
 * check this link for more detail:- https://www.npmjs.com/package/react-native-router-flux
 */

const RouterComponent = props => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="mainScreen"
          component={MainScreen}
          hideNavBar={false}
          back={true}
          initial={true}
          title="Activity Log"
          headerStyle={{backgroundColor: ThemeColors.secondaryColor}}
          headerTintColor="#FFF"
          backgroundColor={ThemeColors.secondaryColor}
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
