import React, { memo, useState } from 'react';
import axios from 'axios';
import { AsyncStorage, ScrollView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import Logo from '../components/Logo';
import TouchID from 'react-native-touch-id';
import ToggleSwitch from 'toggle-switch-react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [enableTouchID, setTouchID] = useState({ value: false });

  const _onLoginPressed = async () => {

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    else {
      try {
        let userData = {
          email: email.value,
          password: password.value
        }
        const { data } = await axios.post('http://api-splitit.herokuapp.com/api/auth/login/', userData)
        if (data['token']) {
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
          isOn= {enableTouchID.value}
          onColor='#0099FF'
          offColor='#C0C0C0'
          onToggle={() => setTouchID({value: !enableTouchID.value})}
          label='Enable Touch ID'
          labelStyle={{ color: 'red' }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
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