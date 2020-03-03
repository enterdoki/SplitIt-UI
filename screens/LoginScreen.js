import React, { memo, useState } from 'react';
import axios from 'axios';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import Logo from '../components/Logo';
import * as LocalAuthentication from 'expo-local-authentication';
import ToggleSwitch from 'toggle-switch-react-native';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [enableTouchID, setTouchID] = useState({ value: SecureStore.getItemAsync('TouchID') === null || 'false' ? false : true });

  const _toggleTouchID = async () => {
    if (enableTouchID.value === false) {
      setTouchID({ value: true })
      await SecureStore.setItemAsync('TouchID', 'true');
    }
    else {
      setTouchID({ value: false })
      await SecureStore.deleteItemAsync('TouchID');
    }

  }
  const _onLoginPressed = async () => {

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (enableTouchID.value === true && await SecureStore.getItemAsync('Email') !== null && await SecureStore.getItemAsync('Password') !== null) {
      const userData = {
        email: await SecureStore.getItemAsync('Email'),
        password: await SecureStore.getItemAsync('Password')
      }
      try {
        const results = await LocalAuthentication.authenticateAsync();
        if (results.success) {
          const { data } = await axios.post('http://api-splitit.herokuapp.com/api/auth/login/', userData)
          if (data['token']) {
            navigation.navigate('HomeScreen');
          }
        }
        else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
    else if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    else {
      try {
        const userData = {
          email: email.value,
          password: password.value
        }

        const { data } = await axios.post('http://api-splitit.herokuapp.com/api/auth/login/', userData)
        if (data['token']) {
          if (enableTouchID.value === true) {
            await SecureStore.setItemAsync('Email', email.value);
            await SecureStore.setItemAsync('Password', password.value);
          }
          // setEmail({ value: '' });
          // setPassword({ value: '' });
          navigation.navigate('HomeScreen');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Background>

      <Logo />
      <Header>Welcome to SplitIt!</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <ToggleSwitch
          isOn={enableTouchID.value}
          onColor='#0099FF'
          offColor='#C0C0C0'
          onToggle={() => _toggleTouchID()}
          label='Enable TouchID'
          labelStyle={{ color: 'red' }}
        />
        <TouchableOpacity
          onPress={() => _removeStuff()}
        // onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
