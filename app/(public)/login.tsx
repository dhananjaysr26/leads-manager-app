import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { useAuth } from '~/provider/AuthProvider';
import { signInUser } from '~/services/login.services';

const Login = () => {
  const { signIn } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    try {
      setLoading(true);
      const res = await signInUser({ username: userName, password });
      if (res.statusCode === 201) {
        signIn(res.data);
      } else if (res?.errorMessage) {
        return alert(res?.errorMessage || 'Something Went Wrong!');
      } else {
        return alert('Login Failed!');
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <TextInput
        autoCapitalize="none"
        placeholder="user name"
        value={userName}
        onChangeText={setUserName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <Button onPress={onSignInPress} title="Login" color="#6c47ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Login;
