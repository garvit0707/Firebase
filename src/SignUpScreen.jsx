import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { SuccessToast, ErrorToast, WarningToast } from './utils/Toast';
import { useDispatch } from 'react-redux';
import { saveuserdetail } from './store/Slices/UserSlices';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = () => {
    dispatch(saveuserdetail({name,address,email,password}))
    createUserWithEmailAndPassword(getAuth(), email, password,name,address)
      .then(Response => {
        console.log('User account created & signed in!');
        if (Response?.user?.uid) {
          SuccessToast('Account hase beeen created successfully!!!');
          setTimeout(() => {
            navigation.navigate('login');
          }, 1000);
        }
        console.log('Response coming is this', JSON.stringify(Response));
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ErrorToast('Email address is already in use');
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          ErrorToast('email address is invalid');
          console.log('That email address is invalid!');
        }

        if (error.code === 'auth/weak-password') {
          ErrorToast('weak password');
        }

        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
      <Text>This is the signup screen</Text>
      {/* <TextInput style={style.name} placeholder="Enter Name"></TextInput> */}
      <TextInput
        style={style.name}
        placeholder="Enter name"
        value={name}
        onChangeText={(val)=>setName(val)}
      ></TextInput>
      <TextInput
        style={style.name}
        placeholder="Enter address"
        value={address}
        onChangeText={(val)=>setAddress(val)}
      ></TextInput>
      <TextInput
        style={style.name}
        placeholder="Enter Email"
        value={email}
        onChangeText={item => setEmail(item)}
      ></TextInput>
      <TextInput
        style={style.name}
        placeholder="Enter Password"
        value={password}
        onChangeText={item => setPassword(item)}
      ></TextInput>
      <Pressable
        onPress={() => {
          console.log('it is pressed');
          handleSignup();
        }}
        style={({ pressed }) => [
          {
            borderWidth: 1,
            borderColor: 'gray',
            marginTop: 10,
            paddingVertical: 10,
            borderRadius: 10,
            paddingHorizontal: 95,
            backgroundColor: pressed ? '#8a2be2' : 'white',
          },
        ]}
      >
        <Text style={{ fontWeight: '700' }}>Register</Text>
      </Pressable>
    </View>
  );
};

export default SignUpScreen;

const style = StyleSheet.create({
  name: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 250,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
