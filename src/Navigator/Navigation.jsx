import React from 'react'
import {View,Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../SignUpScreen';
import LoginScreen from '../LoginScreen';
import FireBase from '../FireBase';
import HomeDashboardScreen from '../HomeDashboardScreen';
import PdfViewer from '../pdfViewer/PdfViewer';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
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
