import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CleanCard from '../components/CleanCard';
import { PrimaryPill, TextAction } from '../components/CleanCTA';
import { palette, type } from '../theme/design';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: name, email: email.toLowerCase(), password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Sign up failed', data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Sign up error:', err);
      Alert.alert('Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.sub}>Start your speaking journey.</Text>

        <CleanCard style={{ marginTop: 14 }}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#8D93AE"
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <View style={styles.sep} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#8D93AE"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <View style={styles.sep} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#8D93AE"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </CleanCard>

        <PrimaryPill 
          title={loading ? "Creating..." : "Create account"} 
          onPress={handleSignUp} 
          style={{ marginTop: 14 }}
          disabled={loading}
        />
        <TextAction title="I already have an account" onPress={() => navigation.navigate('Login')} style={{ marginTop: 8 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 4, ...type.body },
  input: { color: palette.text, fontSize: 16, paddingVertical: 10 },
  sep: { height: 1, backgroundColor: 'rgba(66,74,140,0.12)' },
});
