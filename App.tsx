import React, {useEffect} from 'react';
import {
  Alert,
  BackHandler,
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/Navigation';
import {RouteNames} from './src/navigation/Routes';
import {showToast} from './src/constants/commonUtils';
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import store from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from './src/constants/AppStrings';
import DeviceInfo from 'react-native-device-info';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { AuthorizationStatus } from '@notifee/react-native';


const App = () => {
  const inAppUpdates = new SpInAppUpdates(
    false, // isDebug
  );

  useEffect(() => {
    const checkForUpdates = async () => {
      const currentVersion = DeviceInfo.getVersion(); // Get the current version of the app
      const appStoreUrl =
        'https://apps.apple.com/in/app/nxt-lvl-4x4/id6479346224'; // App Store URL

      if (Platform.OS === 'ios') {
        const response = await fetch(
          'https://itunes.apple.com/lookup?bundleId=${com.bnbcnxtlevel.app}',
        );
        const data = await response.json();
        if (data.resultCount > 0) {
          const appStoreVersion = data.results[0].version;

          if (appStoreVersion && appStoreVersion > currentVersion) {
            Alert.alert(
              'Update available',
              'There is a new version of the app available on the App Store, do you want to update it?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    BackHandler.exitApp();
                  },
                  style: 'cancel',
                },
                {
                  text: 'Update',
                  onPress: () => {
                    Linking.openURL(appStoreUrl);
                  },
                },
              ],
              {cancelable: false},
            );
          }
        }
      } else {
        // For Android, you can continue using inAppUpdates
        const result = await inAppUpdates.checkNeedsUpdate({});
        if (result.shouldUpdate) {
          const updateOptions = {
            updateType: IAUUpdateKind.IMMEDIATE,
          };
          const updateResult = await inAppUpdates.startUpdate(updateOptions);
          if (
            updateResult === 'UPDATE_CANCELLED' ||
            updateResult === 'UPDATE_FAILED'
          ) {
            BackHandler.exitApp();
          }
        }
      }
    };

    checkForUpdates();
  }, []);
   
  useEffect(() => {
    const checkNotificationPermission = async () => {
      const settings = await notifee.getNotificationSettings();
      if (
        settings.authorizationStatus === AuthorizationStatus.NOT_DETERMINED
      ) {
        const requestPermission = async () => {
          const settings = await notifee.requestPermission({
            criticalAlert: true,
          });
          return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
        };
        return await requestPermission();
      }
      return (
        settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
      );
    };

    const checkToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      await AsyncStorage.setItem('fcmToken', token);
    };

    const notificationAndroid = async () => {
      const version = Platform.Version;
      if (Platform.OS === 'android' && version > 31) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            showToast('Notification permission allowed');
          } else {
            showToast('Notification permission denied');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    };

    checkNotificationPermission();
    if (Platform.OS === 'android') notificationAndroid();
    checkToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
      console.log('Foreground Message:', remoteMessage);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        onDisplayNotification(remoteMessage);
        console.log('Background Message:', remoteMessage);
      }
    );
    return unsubscribe;
  }, []);

  const onDisplayNotification = async remoteMessage => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: remoteMessage.data.title,
      body: remoteMessage.data.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
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
