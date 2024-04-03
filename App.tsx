/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './store';
import {Provider} from 'react-redux';
import AppStrings from './src/constants/AppStrings';
import Navigation from './src/navigation/Navigation';
import {RouteNames} from './src/navigation/Routes';

export default class App extends React.Component {

  componentDidMount(): void {
    
    PushNotification.createChannel(
      {
        channelId: 'nxtlevel_channel_id', // Replace with your chosen channel ID
        channelName: 'nxtlevel Notifications',
        importance: Importance.HIGH, // Adjust importance level as needed
        vibrate: true, // Enable vibration for notifications
      },
      (created: any) => console.log(`Channel created: ${created}`),
    );
    PushNotification.configure({
      invokeApp: true,
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token: any) {
        console.log(token)
        await AsyncStorage.setItem(AppStrings.FCM_TOKEN, token.token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        // Check if the app is in the foreground (open)
        if (notification.foreground) {
          console.log('foreground');
          // Display a local notification when the app is open
          PushNotification.localNotification({
            title: notification.title,
            message: notification.message,
            channelId: 'nxtlevel_channel_id',
          });
        } else {
          if (notification.userInteraction) {
            // Notification was clicked, navigate to the desired screen
            this.props.navigation.navigate(RouteNames.SplashScreen); // Replace with the desired screen
          }
        }
        // Finish processing the notification
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification: {action: any}) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err: {message: any}) {
        console.error(err.message, err);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: '1096238675733',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      requestPermissions: true,
    });
    // Simulate a dummy notification for testing
    // setTimeout(() => {
    //   PushNotification.localNotification({
    //     title: 'Test Notification',
    //     message: 'This is a test notification!',
    //     channelId: 'nxtlevel_channel_id',
    //   });
    // }, 5000); // Send the notification after 5 seconds
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
