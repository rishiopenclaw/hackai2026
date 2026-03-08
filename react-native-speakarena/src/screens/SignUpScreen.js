import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeroBackground from '../components/HeroBackground';

export default function SignUpScreen() {
  const { width, height } = useWindowDimensions();
  const shellWidth = Math.min(width - 20, 390);
  const shellHeight = Math.min(height - 28, 844);

  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient colors={['#2A1A10', '#0D0B0B']} style={StyleSheet.absoluteFill} />

      <View style={[styles.phoneShell, { width: shellWidth, height: shellHeight }]}>
        <View style={styles.hero}>
          <HeroBackground />
        </View>

        <View style={styles.bottomPane}>
          <Text style={styles.headline}>
            <Text style={styles.headlineMuted}>SpeechLab – </Text>
            <Text style={styles.headlineStrong}>AI voice</Text>{'\n'}
            <Text style={styles.headlineStrong}>changer for perfect</Text>{'\n'}
            <Text style={styles.headlineStrong}>transformation</Text>
          </Text>

          <Pressable style={({ pressed }) => [styles.ctaWrap, pressed && styles.pressed]}>
            <LinearGradient
              colors={['#FF6A2D', '#FF9A36', '#FFE88A']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>Sign up</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}>
            <Text style={styles.secondaryText}>I have an account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  phoneShell: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#34363D',
    overflow: 'hidden',
    backgroundColor: '#000',
    shadowColor: '#C78633',
    shadowOpacity: 0.22,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },

  hero: {
    flex: 1,
    position: 'relative',
  },

  bottomPane: {
    backgroundColor: '#010204',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
  },

  headline: {
    color: '#fff',
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '400',
    letterSpacing: -0.45,
  },
  headlineMuted: { color: '#70717A', fontWeight: '400' },
  headlineStrong: { color: '#FFFFFF', fontWeight: '700' },

  ctaWrap: {
    borderRadius: 999,
    overflow: 'hidden',
    shadowColor: '#FFB347',
    shadowOpacity: 0.30,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 9,
  },
  cta: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  ctaText: {
    color: '#161310',
    fontSize: 22,
    fontWeight: '500',
  },

  secondary: {
    minHeight: 50,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1F2229',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05070B',
  },
  secondaryText: {
    color: '#8E929D',
    fontSize: 16,
    fontWeight: '400',
  },

  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
});
