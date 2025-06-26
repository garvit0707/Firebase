import React, { useEffect } from 'react'
import {Text,View,StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

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
      <Text style={{color:'black'}}>this is the home fire base screen, go to the login screen</Text>
      <TouchableOpacity onPress={handlepress} style ={Style.button}>
        <Text>LOGIN PAGE REDIRECT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FireBase

const Style = StyleSheet.create({
    button:{
        alignItems:"center",
        marginTop:50,
        borderWidth:1,
        borderColor:"gray",
        padding:20,
        backgroundColor: "lightblue",
        width:"200",
        alignSelf:"center"
    },
    container:{
        borderWidth:3,
        borderColor:"red",
        flexDirection:"column",
        flex:1,
        // justifyContent:"space-around"
    }
})