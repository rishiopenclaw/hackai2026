import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import CleanCard from '../components/CleanCard';
import { PrimaryPill, TextAction } from '../components/CleanCTA';
import { palette, type } from '../theme/design';
import { bootstrapDemoSession } from '../lib/api';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinueToApp = async () => {
    try {
      const demoName = name?.trim() || 'Guest User';
      await bootstrapDemoSession({
        displayName: demoName,
        email: email?.trim()?.toLowerCase() || 'guest@speakarena.app',
      });
      navigation.replace('MainTabs');
    } catch (err) {
      console.error('Sign up error:', err);
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
          title="Create account"
          onPress={handleContinueToApp}
          style={{ marginTop: 14 }}
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
