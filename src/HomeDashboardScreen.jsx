import React, { useEffect, useState } from 'react'
import {Text,View,TouchableOpacity} from "react-native";
import { getAuth, signOut } from '@react-native-firebase/auth';
import { SuccessToast } from './utils/Toast';
import { useNavigation } from '@react-navigation/native';
import { EventLog } from './Eventlog/EventLog';

const HomeDashboardScreen = () => {
    const [signColor,SetSignColor] = useState("")
    const navigation =  useNavigation()
    useEffect(()=>{
        try {
            EventLog({eventName: "homescreen",payload: {data:"homedata",id: "uniqur_id"}})
        } catch (error) {
            console.log("error is here io have",error)
        }
    },[])
    const handleSignout=()=>{
        try {
            EventLog({eventName: "usersignout",payload: {data: "data deleted",credential: "erased"}})
        } catch (error) {
            console.log("error in event signout",error)
        }
        SetSignColor("blue")
        signOut(getAuth()).then(() => {
            console.log('User signed out!')
            SuccessToast("User signed out Succesfully!!")
            setTimeout(() => {
                navigation.navigate("login")
            }, 1000);
        }
    );

    }
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>This is the home screen</Text>
        <View style = {{justifyContent:"center",flexDirection:"row",gap:10}}>
            <Text>Want to sign out</Text>
            <TouchableOpacity style={{borderBottomColor:"gray",borderBottomWidth:1}} onPress={handleSignout}>
                <Text style={{color: signColor? signColor:"black"}}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeDashboardScreen
