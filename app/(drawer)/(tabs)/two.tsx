import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useAuth } from '~/provider/AuthProvider';
import { createLead } from '~/services/leads.services';

export default function CreateLead() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const isUndefined = Object.values(data).every((value) => !value);

    if (isUndefined) {
      return setError('All Fields are Required!');
    } else {
      setError('');
    }

    const res = await createLead(
      { ...data, applicant_number: +data?.applicant_number },
      user?.token
    );
    // console.log('-------->', res);
    if (res?.statusCode === 201) {
      alert('Lead Created');
      reset();
      return router.push('/(drawer)/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Lead</Text>
      <View style={styles.form}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="applicant_name"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value?.toString()}
              keyboardType="numeric"
            />
          )}
          name="applicant_number"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="applicant_address"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="District"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="district"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="State"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="state"
        />

        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create Lead</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    marginTop: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
