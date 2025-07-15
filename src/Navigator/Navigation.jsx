// import React from 'react'
// import {View,Text, Linking} from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignUpScreen from '../SignUpScreen';
// import LoginScreen from '../LoginScreen';
// import FireBase from '../FireBase';
// import HomeDashboardScreen from '../HomeDashboardScreen';
// import PdfViewer from '../pdfViewer/PdfViewer';
// import messaging from '@react-native-firebase/messaging';

// const Stack = createNativeStackNavigator();
// const NAVIGATION_IDS = ['login', 'signup', 'homedashboard'];
// const config = {
//   screens: {
//     login: 'login',
//     signup: 'signup',
//     homedashboard: "homedashboard",
//   },
// };

// const linking = {
//   prefixes: ['deeplink://'],
//   config,
//    async getInitialURL() {
//   // 1. Check normal deep links
//   const url = await Linking.getInitialURL();
//   if (url) {
//     console.log('📱 URL from Linking.getInitialURL:', url);
//     return url;
//   }

//   // 2. Check notification if app was quit
//   const message = await messaging().getInitialNotification();
//   console.log('🔔 FCM initial notification:', message);

//   if (message && message.data) {
//     console.log('📦 FCM data payload:', message.data);
//     const deeplinkURL = buildDeepLinkFromNotificationData(message.data);
//     console.log('🔗 Resolved deep link URL:', deeplinkURL);
//     if (deeplinkURL) return deeplinkURL;
//   } else {
//     console.log('❌ No data in message or message is null');
//   }

//   return null;
// }
// ,
//  subscribe(listener) {
//     const linkingSub = Linking.addEventListener('url', ({ url }) => {
//       listener(url);
//     });

//     const notifSub = messaging().onNotificationOpenedApp(remoteMessage => {
//       const url = buildDeepLinkFromNotificationData(remoteMessage.data);
//       if (url) listener(url);
//     });

//     return () => {
//       linkingSub.remove();
//       notifSub();
//     };
//   },
// };

// function buildDeepLinkFromNotificationData(data) {
//   const navigationId = data?.navigationId;
//   if (!NAVIGATION_IDS.includes(navigationId)) {
//     console.warn('Unverified navigationId', navigationId)
//     return null;
//   }
//   if (navigationId === 'login') {
//     console.log("navig link is ",navigationId)
//     return 'deeplink://login';
//   }
//   if (navigationId === 'signup') {
//     return 'deeplink://signup';
//   }
//   if (navigationId === 'homedashboard') {
//     return 'deeplink://homedashboard';
//   }
//   console.warn('Missing postId')      
//   return null
// }
// const Navigation = () => {
//   return (
//     <NavigationContainer linking={linking}>
//         <Stack.Navigator initialRouteName='firebase'>
//             <Stack.Screen name = "firebase" component={FireBase}/>
//             <Stack.Screen name = "homedashboard" component={HomeDashboardScreen}/>
//             <Stack.Screen name = "login" component={LoginScreen}/>
//             <Stack.Screen name='signup' component={SignUpScreen}/>
//             <Stack.Screen name='pdf' component={PdfViewer}/>
//         </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default Navigation

import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer,DarkTheme,DefaultTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../LoginScreen';
import SignUpScreen from '../SignUpScreen';
import HomeDashboardScreen from '../HomeDashboardScreen';
import PdfViewer from '../pdfViewer/PdfViewer';
import FireBase from '../FireBase';
import Register from '../Register';

const Stack = createNativeStackNavigator();
const NAVIGATION_IDS = ['login', 'signup', 'homedashboard'];

// Step 1: Deep link builder from notification
const buildDeepLinkFromNotificationData = (data) => {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('❌ Unverified navigationId:', navigationId);
    return null;
  }

  return `deeplink://${navigationId}`;
};

// Step 2: Deep linking config
const linkingConfig = {
  prefixes: ['deeplink://'],
  config: {
    screens: {
      login: 'login',
      signup: 'signup',
      homedashboard: 'homedashboard',
    },
  },
};

const Navigation = () => {
  const [initialURL, setInitialURL] = useState(null);
  const [ready, setReady] = useState(false);
  const theme = useColorScheme();
  // Step 3: Prepare initial deep link URL
  useEffect(() => {
    const fetchInitialURL = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          console.log('🔗 Opened via URL:', url);
          setInitialURL(url);
        } else {
          const remoteMessage = await messaging().getInitialNotification();
          console.log('🔔 FCM initial notification:', remoteMessage);
          if (remoteMessage?.data) {
            const deepLink = buildDeepLinkFromNotificationData(remoteMessage.data);
            console.log('🌐 Generated deep link:', deepLink);
            setInitialURL(deepLink);
          } else {
            console.log('❌ No data in message or message is null');
          }
        }
      } catch (err) {
        console.error('💥 Error fetching initial URL:', err);
      } finally {
        setReady(true);
      }
    };

    fetchInitialURL();
  }, []);

  // Step 4: Subscribe to background + runtime deep links
  const subscribe = (listener) => {
    const handleURL = ({ url }) => {
      console.log('📥 Received runtime deep link:', url);
      listener(url);
    };

    const linkingSubscription = Linking.addEventListener('url', handleURL);

    const notifSubscription = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('🔁 Notification tapped (background):', remoteMessage);
      const deepLink = buildDeepLinkFromNotificationData(remoteMessage?.data);
      if (deepLink) listener(deepLink);
    });

    return () => {
      linkingSubscription.remove();
      notifSubscription();
    };
  };

  // Step 5: Wait until initial URL is ready
  if (!ready) return null; // or <SplashScreen />

  return (
    <NavigationContainer
      linking={{
        ...linkingConfig,
        getInitialURL: () => Promise.resolve(initialURL),
        subscribe,
      }}
    >
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="firebase" component={FireBase} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignUpScreen} />
        <Stack.Screen name="homedashboard" component={HomeDashboardScreen} />
        <Stack.Screen name="pdf" component={PdfViewer} />
        <Stack.Screen name='register' component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

