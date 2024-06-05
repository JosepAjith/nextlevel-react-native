/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    const { notification, data } = remoteMessage;
    notifee.displayNotification({
     title: notification.title,
     body: notification.body,
     data
     });
   });
    
   function HeadlessCheck({ isHeadless }) {
     if (isHeadless) {
       // App has been launched in the background by iOS, ignore
       return null;
     }
   
     return <App />;
   }
   

AppRegistry.registerComponent(appName, () => HeadlessCheck);
