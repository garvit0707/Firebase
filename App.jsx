import React, { useEffect } from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import FireBase from './src/FireBase';
import Navigation from './src/Navigator/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { store } from './src/store/Store';
import { Provider } from 'react-redux';
import { setupFirebaseNotifications } from './src/setupFirebaseNotifications ';

const App = () => {
  useEffect(() => {
    setupFirebaseNotifications();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <RootSiblingParent>
            <Navigation />
        </RootSiblingParent>
      </Provider>
    </View>
  );
};

export default App;
