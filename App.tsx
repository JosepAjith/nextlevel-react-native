import React, { useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import { RouteNames } from './src/navigation/Routes';
import { showToast } from './src/constants/commonUtils';
import SpInAppUpdates, { IAUInstallStatus, IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import store from './store';
import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from './src/constants/AppStrings';

const App = () => {

  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    const inAppUpdates = new SpInAppUpdates(
      false// isDebug
    );
    // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
    try {
      await inAppUpdates.checkNeedsUpdate().then((result) => {
        try {
          if (result.shouldUpdate) {
            let updateOptions: StartUpdateOptions = {};
            if (Platform.OS === "android") {
              // android only, on iOS the user will be promped to go to your app store page
              updateOptions = {
                updateType: IAUUpdateKind.IMMEDIATE,
              };
            }
            if (Platform.OS === "ios") {
              updateOptions = {
                title: "Update available",
                message:
                  "There is a new version of the app available on the App Store, do you want to update it?",
                buttonUpgradeText: "Update",
                buttonCancelText: "Cancel",
              };
            }
            inAppUpdates.addStatusUpdateListener((downloadStatus) => {
              console.log("download status", downloadStatus);
              if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
                console.log("downloaded");
                inAppUpdates.installUpdate();
                inAppUpdates.removeStatusUpdateListener((finalStatus) => {
                  console.log("final status", finalStatus);
                });
              }
            });
            inAppUpdates.startUpdate(updateOptions);
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Notifications
    checkApplicationPermission();
    PushNotification.createChannel(
      {
        channelId: 'nxtlevel_channel_id',
        channelName: 'nxtlevel Notifications',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`),
    );
    PushNotification.configure({
      invokeApp: true,
      onRegister: async function (token) {
        await AsyncStorage.setItem(AppStrings.FCM_TOKEN, token.token);
      },
      onNotification: function (notification) {
        if (notification.foreground) {
        // Check if the app is in the foreground and the notification was clicked
    if (notification.userInteraction) {
      // If the notification was clicked, navigate to the desired screen
    } else {
      // If the notification is received while the app is in the foreground, display a local notification
      PushNotification.localNotification({
        title: notification.title,
        message: notification.message,
        channelId: 'nxtlevel_channel_id',
      });
    }
        } else {
          if (notification.userInteraction) {
            console.log('Background Notification:', notification);
          }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      senderID: '1096238675733',
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
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
  }, []);

  const checkApplicationPermission = async () => {
    const version = Platform.Version;
    if (Platform.OS === 'android' && version > 31) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          showToast('Notification permission allowed');
        } else {
          showToast('Notification permission denied');
        }
      } catch (error) {
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
