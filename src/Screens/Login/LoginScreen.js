/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setCredentials} from './authSlice';
import {useLoginMutation} from './authApiSlice';
import {CommonButton, TextFieldInput} from '../../Components/Inputs/index';
const LoginScreen = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const [authData, setAuthData] = useState({
    username: 'ks_0@gmail.com',
    password: 'secret',
  });
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const userData = await login(authData).unwrap();
      dispatch(setCredentials(userData['data']));
    } catch (err) {
      console.log(err);
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        // setErrMsg('No Server Response');
      } else if (err.originalStatus === 400) {
        // setErrMsg('Missing Username or Password');
      } else if (err.originalStatus === 401) {
        // setErrMsg('Unauthorized');
      } else {
        // setErrMsg('Login Failed');
      }
      // errRef.current.focus();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.w_100}>
            <TextFieldInput
              isDarkMode={isDarkMode}
              textChangeFunction={text => {
                setAuthData({...authData, username: text});
              }}
              value={authData.username}
              title={'Username'}
            />
          </View>
          <View style={styles.w_100}>
            <TextFieldInput
              isDarkMode={isDarkMode}
              textChangeFunction={text => {
                setAuthData({...authData, password: text});
              }}
              value={authData.password}
              title={'Password'}
            />
          </View>
          <CommonButton
            loading={isLoading}
            pressFunction={handleSubmit}
            title={'Login'}
          />
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  w_100: {
    width: '100%',
  },
});

export default LoginScreen;
