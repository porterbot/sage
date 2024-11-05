import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Amplify from "@aws-amplify/core";
import { Auth } from '@aws-amplify/auth'; // Correct Auth import

import awsmobile from '../aws-exports'; // This is where you import your Amplify configuration

// Initialize Amplify
Amplify.configure(awsmobile);

export default function LoginScreen ({ navigation, isAuthenticated, setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Home');
    }
  }, [isAuthenticated]);

  const signIn = async () => {
    try {
      console.log(username, password)
      const user = await Auth.signIn(username, password);
      navigation.replace('Home');
    } catch (error) {
      setMessage(`Error logging in: ${error.message}`);
    }
  };
  return (
      <View style={styles.container}>
        <Text style={styles.title}>SAGE Mobile Observations Login</Text>

        <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
        />

        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
        />

        <Button title="Sign In" onPress={signIn} />

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});
