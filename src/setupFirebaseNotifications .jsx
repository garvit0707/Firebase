import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

export const setupFirebaseNotifications = () => {
  // Foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('📲 Foreground message received:', remoteMessage);
    Alert.alert('New Notification', remoteMessage.notification?.body || '');
  });

  // Background and quit state (for Android)
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📥 Background message handled!', remoteMessage);
  });

  // Opened from background state
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('🔁 Notification caused app to open:', remoteMessage);
  });

  // Opened from quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('📦 App opened from quit by notification:', remoteMessage);
      }
    });
};
