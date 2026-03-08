import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import HeroBackground from '../components/HeroBackground';
import AppleButton from '../components/AppleButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.hero}><HeroBackground /></View>
      <View style={styles.bottom}>
        <View style={styles.badge}><Sparkles size={14} color="#FFB25B" /><Text style={styles.badgeText}>AI Speech Coach</Text></View>
        <Text style={styles.title}>Find your{`\n`}voice, daily.</Text>
        <Text style={styles.subtitle}>Apple-clean speaking practice. Short guided sessions for clarity, confidence, and better communication.</Text>
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
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 4,
  },
  badgeText: { color: '#D8DDE8', fontSize: 12, fontWeight: '600' },
  title: { color: '#fff', fontSize: 42, lineHeight: 48, letterSpacing: -0.4, fontWeight: '700' },
  subtitle: { color: '#A1A7B3', fontSize: 14, lineHeight: 20 },
});
