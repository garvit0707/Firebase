import React, { useEffect } from 'react';
import { View, Text, PermissionsAndroid, Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import FireBase from './src/FireBase';
import Navigation from './src/Navigator/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { store } from './src/store/Store';
import { Provider } from 'react-redux';

const App = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token: ', token);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'New Notification',
        JSON.stringify(remoteMessage.notification),
      );
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <Navigation />
      </RootSiblingParent>
    </Provider>
  );
};

export default App;
