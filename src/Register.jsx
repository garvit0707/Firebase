import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import Snackbar from 'react-native-snackbar';
const Register = ({ navigation, users, setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const handlehome = () => {
    navigation.navigate('Home');
  };
  const handleregister = () => {
    navigation.navigate('SignIN');
  };

  const handleSignup = async () => {
    console.log("this button is pressed here!!")
    try {
      const api = await fetch('https://theblogbackend-xuog.onrender.com/', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        Body: {
          name: name,
          email: email,
          password: password,
        },
      });

      const data = await api.response();
      console.log('data is getting', data);
    } catch (error) {
      console.log('error in creating the user');
    }
    // if (name && email && password && confirmpassword ){
    //   if (password !==confirmpassword){
    //     Snackbar.show({
    //       text: "Password doesn't matches",
    //       duration: Snackbar.LENGTH_LONG,
    //       action: {
    //         text: "UNDO",
    //       }
    //     })
    //     return;
    //   }

    //   const NAME_REGEX = /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FF]+([ \-']{0,1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FF]+){0,2}[.]{0,1}$/
    //   if (NAME_REGEX.test(name)!== true){
    //     Snackbar.show({
    //       text: "Enter the valid name",
    //       duration: Snackbar.LENGTH_LONG,
    //       action: {
    //         text: "UNDO",
    //         textColor: "green",
    //       }
    //     })
    //     return;
    //   }

    //   const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //   if (emailRegex.test(email)!==true){
    //     // Alert.alert("enter the valid email")
    //     Snackbar.show({
    //       text: "Enter the valid email",
    //       duration: Snackbar.LENGTH_LONG,
    //       action: {
    //         text: "UNDO",
    //         textColor: "pink"
    //       }
    //     })
    //     return;
    //   }

    //   const newUser = {name, email, password};
    //   setUsers([...users,newUser]);
    //   setName("")
    //   setEmail("")
    //   setPassword("")
    //   setConfirmpassword("")
    //   Snackbar.show({
    //     text: "Sucessfully Registed",
    //     duration: Snackbar.LENGTH_SHORT,
    //     action: {
    //       text: "GO ahead",
    //       textColor: "green"
    //     }
    //   })
    //   setTimeout(() => {
    //     navigation.navigate('SignIN');
    //   }, 2000);

    // }
    // else{
    //   // Alert.alert("Please fill all the field!")
    //   Snackbar.show({
    //     text: "Please fill all the field",
    //     duration: Snackbar.LENGTH_LONG,
    //     action: {
    //       text: "UNDO",
    //       textColor: "green"
    //     }
    //   })
    // }
  };

  return (
    <SafeAreaView style={Styles.registerdata}>
      <Text style={Styles.registerdata1}>Lets Register</Text>
      <Text style={Styles.registerdata0}>Account</Text>
      <Text style={Styles.registerdata2}>Hello Users, You have</Text>
      <Text style={Styles.registerdata3}>a greatful journey!</Text>
      <TextInput
        style={Styles.registerinput1}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={Styles.registerinput1}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={Styles.registerinput1}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={Styles.registerinput1}
        placeholder="confirmPassword"
        value={confirmpassword}
        onChangeText={text => setConfirmpassword(text)}
        secureTextEntry
      />

      <TouchableOpacity>
        <Text style={Styles.registerdata5} onPress={handleSignup}>
          Sign up
        </Text>
      </TouchableOpacity>
      <View style={Styles.registerdata6}>
        <Text style={Styles.registerdata7}>
          Already have an account?{' '}
          <Text
            onPress={handleregister}
            style={{ fontSize: 20, color: 'rgba(0, 0, 255, 0.5)' }}
          >
            {' '}
            Login
          </Text>
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 15,
            fontSize: 20,
            fontWeight: '800',
          }}
        >
          go to the home page
          <Text style={{ fontSize: 20, color: 'red' }} onPress={handlehome}>
            {' '}
            Home
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  registerdata: {
    marginLeft: 25,
    marginTop: 26,
  },
  registerdata0: {
    fontSize: 35,
    fontWeight: '900',
    color: 'black',
  },
  registerdata1: {
    marginTop: 10,
    fontSize: 35,
    fontWeight: '900',
    color: 'black',
  },
  registerdata2: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
    marginTop: 10,
  },
  registerdata3: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
    marginBottom: 30,
  },
  registerinput1: {
    height: 65,
    width: 340,
    borderRadius: 7,
    padding: 13,
    borderColor: 'red',
    marginBottom: 10,
    fontSize: 25,
    textColor: 'black',
    fontWeight: '600',
    borderColor: 'grey',
    borderWidth: 2,
  },
  registerdata4: {
    marginLeft: 220,
    color: 'black',
  },
  registerdata5: {
    marginTop: 15,
    height: 65,
    borderWidth: 1,
    borderRadius: 7,
    padding: 14,
    width: 340,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: '400',
  },
  registerdata6: {
    marginTop: 25,
  },
  registerdata7: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default Register;
