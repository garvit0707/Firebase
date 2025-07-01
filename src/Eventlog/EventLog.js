import React from 'react'
import {View,Text, Alert} from "react-native";
import analytics from '@react-native-firebase/analytics';


export const EventLog=async({eventName = "",payload})=>{
    try {
        await analytics().logEvent(eventName,payload)
        console.log("event captured done ")
    } catch (error) {
        console.log("error is ",error)
        Alert.alert("error comes out!!!")
    }
};