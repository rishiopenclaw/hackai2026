import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import HeroBackground from '../components/HeroBackground';
import AppleButton from '../components/AppleButton';
import AppleCard from '../components/AppleCard';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.hero}><HeroBackground /></View>
      <View style={styles.bottom}>
        <Text style={styles.title}>Welcome back</Text>
        <AppleCard>
          <TextInput placeholder="Email" placeholderTextColor="#7E8592" style={styles.input} />
          <View style={styles.sep} />
          <TextInput placeholder="Password" placeholderTextColor="#7E8592" secureTextEntry style={styles.input} />
        </AppleCard>
        <AppleButton title="Continue" onPress={() => navigation.replace('MainTabs')} style={{ marginTop: 10 }} />
        <AppleButton title="Create account" secondary onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 10 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  hero: { flex: 0.62 },
  bottom: { flex: 0.38, paddingHorizontal: 22, paddingTop: 14, backgroundColor: '#07080D' },
  title: { color: '#fff', fontSize: 34, fontWeight: '700', marginBottom: 12 },
  input: { color: '#fff', fontSize: 16, paddingVertical: 10 },
  sep: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
});
