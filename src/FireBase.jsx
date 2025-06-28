import React, { useEffect } from 'react'
import {Text,View,StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import PhoneSignIn from './PhoneSignIn';

const FireBase = () => {
    const navigation = useNavigation()
    useEffect(()=>{
        console.log("this is in picture")
    },[])

    const handlepress=()=>{
        navigation.navigate("login")
    }

  return (
    <View style={Style.container}>
      <Text style={{color:'black',marginTop:20,alignSelf:"center"}}>This is the home fire base screen, go to the login screen</Text>
      <TouchableOpacity onPress={handlepress} style ={Style.button}>
        <Text>LOGIN PAGE REDIRECT</Text>
      </TouchableOpacity>
      <PhoneSignIn></PhoneSignIn>
    </View>
  )
}

export default FireBase

const Style = StyleSheet.create({
    button:{
        alignItems:"center",
        marginTop:20,
        borderWidth:1,
        borderColor:"gray",
        padding:10,
        backgroundColor: "lightblue",
        width:"190",
        alignSelf:"center",
        borderRadius:50
        
    },
    container:{
        // borderWidth:3,
        // borderColor:"red",
        // flexDirection:"column",
        flex:1,
        // justifyContent:"space-around"
    }
})