import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { SuccessToast,ErrorToast, WarningToast } from './utils/Toast';


const LoginScreen = () => {
  const [email,setEmail] = useState("");
  const [Password,setPassword] = useState("");
  const [userdetail,setUserDetail] = useState("");
  const navigation = useNavigation();
  
  console.log("the user login value is here!!!",userdetail)
  const handleLogin=()=>{
    signInWithEmailAndPassword(getAuth(), email, Password)
      .then((Response) => {
        console.log('Congrats you signed in!',(Response?.user?.providerData));
        setUserDetail(Response?.user)
        if (Response?.user?.uid){
          SuccessToast("Logged in Successfully!!")
          setTimeout(() => {
            navigation.navigate("homedashboard")
          }, 1000);
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          ErrorToast("Email already in use")
        }
    
        if (error.code === 'auth/invalid-email') {
          WarningToast("email address is invalid!")
          console.log('That email address is invalid!');
        }
        if (error.code === "auth/invalid-credential"){
          WarningToast("Invalid Email or Password");
        }
        // console.error(error);
      });
  }

  return (
    <View>
      <Text style={style.headingText}>Do Login with your credentials</Text>
      <TextInput style={style.textinputemail} placeholder="Enter Email" value={email} onChangeText={setEmail}/>
      <TextInput style={style.textinputemail} placeholder="Enter Password" value = {Password}  onChangeText={setPassword}/>
      <Pressable
        onPress={() => handleLogin()}
        style={({ pressed }) => [
          style.submitbtn,
          { backgroundColor: pressed ? 'dodgerblue' : 'lightgray' },
        ]}
      >
        <Text>Submit</Text>
      </Pressable>
      <View style={style.signupTextContainer}>
        <Text style={{}}>Didn't have account?</Text>
        <Pressable
          onPress={() => navigation.navigate('signup')}
          style={style.signupButton}
        >
          {({ pressed }) => (
            <Text style={{ color: pressed ? 'blue' : 'black',fontWeight:"700" }}>Sign up</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};
export default LoginScreen;

const style = StyleSheet.create({
  textinputemail: {
    width: 250,
    padding: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 20,
  },
  textinputpassword: {},
  headingText: {
    textAlign: 'center',
    marginTop: '10',
  },
  submitbtn: {
    backgroundColor: 'lightgray',
    width: '100',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    padding: 8,
    borderRadius: 20,
  },
  signupTextContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  signupButton: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
