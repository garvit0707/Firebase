import React, { useEffect } from 'react'
import {View,Text,PermissionsAndroid, Alert,Platform} from "react-native";
import messaging from "@react-native-firebase/messaging"

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
  console.log("FCM Token: ", token);
};

useEffect(() => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }
  requestUserPermission();
}, []);


  useEffect(() => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('New Notification', JSON.stringify(remoteMessage.notification));
  });

  return unsubscribe;
}, []);

  return (
    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
      <Text>
        Push Notifications
      </Text>
    </View>
  )
}

export default App
