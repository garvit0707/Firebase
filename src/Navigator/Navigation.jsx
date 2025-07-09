import React from 'react'
import {View,Text, Linking} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../SignUpScreen';
import LoginScreen from '../LoginScreen';
import FireBase from '../FireBase';
import HomeDashboardScreen from '../HomeDashboardScreen';
import PdfViewer from '../pdfViewer/PdfViewer';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();
const NAVIGATION_IDS = ['login', 'signup', 'homedashboard'];
const config = {
  screens: {
    login: 'loginscreen/:sort',
    signup: 'signup',
    homedashboard: "homedashboard",
  },
};
1
const linking = {
  prefixes: ['deeplink://'],
  config,
    async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url) {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (deeplinkURL) {
      return deeplinkURL;
    }
  },
 subscribe(listener) {
    const linkingSub = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    const notifSub = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (url) listener(url);
    });

    return () => {
      linkingSub.remove();
      notifSub();
    };
  },
};

function buildDeepLinkFromNotificationData(data) {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null;
  }
  if (navigationId === 'login') {
    return 'deeplink://login';
  }
  if (navigationId === 'signup') {
    return 'deeplink://signup';
  }
  if (navigationId === 'homedashboard') {
    return 'deeplink://homedashboard';
  }
  console.warn('Missing postId')      
  return null
}
const Navigation = () => {
  return (
    <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName='firebase'>
            <Stack.Screen name = "firebase" component={FireBase}/>
            <Stack.Screen name = "homedashboard" component={HomeDashboardScreen}/>
            <Stack.Screen name = "login" component={LoginScreen}/>
            <Stack.Screen name='signup' component={SignUpScreen}/>
            <Stack.Screen name='pdf' component={PdfViewer}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
