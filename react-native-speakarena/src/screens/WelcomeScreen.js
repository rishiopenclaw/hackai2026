import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MessageCircleHeart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PrimaryPill, TextAction } from '../components/CleanCTA';
import { palette, type } from '../theme/design';

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          navigation.replace('MainTabs');
        }
      } catch (e) {
        console.error("Failed to check auth status", e);
      }
    };
    
    // Add small delay to let splash screen transition smoothly if needed
    const timeout = setTimeout(checkLoginStatus, 100);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient colors={[palette.bg, palette.bg2]} style={StyleSheet.absoluteFill} />
      <View style={styles.heroBlob} />
      <View style={styles.content}>
        <View style={styles.badge}><MessageCircleHeart size={14} color={palette.accent2} /><Text style={styles.badgeText}>Vocalyze</Text></View>
        <Text style={styles.title}>Learn to speak{`\n`}with confidence.</Text>
        <Text style={styles.sub}>Daily speaking practice with clear feedback and real-world scenarios.</Text>

        <PrimaryPill title="Create account" onPress={() => navigation.navigate('OnboardingQuiz')} style={{ marginTop: 16 }} />
        <TextAction title="I already have an account" onPress={() => navigation.navigate('Login')} style={{ marginTop: 8 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  heroBlob: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -80,
    right: -60,
    backgroundColor: 'rgba(141,123,255,0.18)',
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: 8,
  },
  badgeText: { color: palette.text, ...type.label },
  title: { color: palette.text, ...type.display },
  sub: { color: palette.subtext, marginTop: 8, ...type.body, maxWidth: 320 },
});
