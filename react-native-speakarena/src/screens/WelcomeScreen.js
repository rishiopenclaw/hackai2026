import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HeroBackground from '../components/HeroBackground';
import AppleButton from '../components/AppleButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.hero}><HeroBackground /></View>
      <View style={styles.bottom}>
        <Text style={styles.title}>Find your{`\n`}voice, daily.</Text>
        <Text style={styles.subtitle}>Debate better. Speak cleaner. Build confidence with AI-guided practice.</Text>
        <AppleButton title="Create account" onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 12 }} />
        <AppleButton title="I already have an account" secondary onPress={() => navigation.navigate('Login')} style={{ marginTop: 10 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090C' },
  hero: { flex: 1 },
  bottom: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 22, gap: 8, backgroundColor: '#07080D' },
  title: { color: '#fff', fontSize: 42, lineHeight: 48, letterSpacing: -0.4, fontWeight: '700' },
  subtitle: { color: '#A1A7B3', fontSize: 14, lineHeight: 20 },
});
