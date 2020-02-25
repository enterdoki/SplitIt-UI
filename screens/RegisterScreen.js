import React, { memo, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator
} from '../core/utils';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = async () => {
    const firstNameError = firstNameValidator(firstName.value);
    const lastNameError = lastNameValidator(lastName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || firstNameError || lastNameError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    else {
      try {
        const newUser = {
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          password: password.value
        }
        const data = await axios.post('http://api-splitit.herokuapp.com/api/auth/register/', newUser)
        if (data.status === 201) {
          navigation.navigate('LoginScreen');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Background>

      <Header>Create an Account</Header>

      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={text => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
      />

      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={text => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
      />

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

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
