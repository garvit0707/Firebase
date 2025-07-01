import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneSignIn from './PhoneSignIn';
import { EventLog } from './Eventlog/EventLog';

const FireBase = () => {
  const navigation = useNavigation();
  useEffect(() => {
    console.log('this is in picture');
  }, []);

  const handlesignup = () => {
    try {
      EventLog({
        eventName: 'signup',
        payload:  'test@gmail.com'
      });
    } catch (error) {
      console.log("error which capturing event!!",error)
    }
  };

  const handlekuchbhi=()=>{
    try{
      EventLog({
        eventName: "name",
        payload: {hello: "this is hello",testing: "made the testing on ot the secured part"},
      })
    }
    catch(error){
      console.log("error while capturing the event!",error)
    }
  };

  const handlepress = () => {
    navigation.navigate('login');
  };

  return (
    <View style={Style.container}>
      <Text style={{ color: 'black', marginTop: 20, alignSelf: 'center' }}>
        This is the home fire base screen, go to the login screen
      </Text>
      <TouchableOpacity onPress={handlepress} style={Style.button}>
        <Text>LOGIN PAGE REDIRECT</Text>
      </TouchableOpacity>
      {/* <PhoneSignIn></PhoneSignIn> */}
      <Button
        title="Signup"
        // Logs in the firebase analytics console as "select_content" event
        // only accepts the two object properties which accept strings.
        onPress={handlesignup}
      />
      <View style={{marginTop:30}}/>
      <Button 
        title = "kuch bhi"
        onPress={handlekuchbhi}
      />
    </View>
  );
};

export default FireBase;

const Style = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    backgroundColor: 'lightblue',
    width: '190',
    alignSelf: 'center',
    borderRadius: 50,
  },
  container: {
    // borderWidth:3,
    // borderColor:"red",
    // flexDirection:"column",
    flex: 1,
    // justifyContent:"space-around"
  },
});
