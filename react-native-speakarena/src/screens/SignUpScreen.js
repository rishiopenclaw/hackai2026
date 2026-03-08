import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeroBackground from '../components/HeroBackground';

function Mark() {
  return (
    <View style={styles.markWrap}>
      <View style={[styles.markStroke, { transform: [{ skewX: '-22deg' }] }]} />
      <View style={[styles.markStroke, styles.markStroke2, { transform: [{ skewX: '-22deg' }] }]} />
      <View style={[styles.markCross, { transform: [{ rotate: '-26deg' }] }]} />
    </View>
  );
}

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
          <Mark />

          <Text style={styles.headline}>
            <Text style={styles.headlineMuted}>SpeechLab – </Text>
            <Text style={styles.headlineStrong}>AI voice</Text>{'\n'}
            <Text style={styles.headlineStrong}>changer for perfect</Text>{'\n'}
            <Text style={styles.headlineStrong}>transformation</Text>
          </Text>

          <Pressable style={({ pressed }) => [styles.ctaWrap, pressed && styles.pressed]}>
            <LinearGradient
              colors={['#FF552D', '#FF8A36', '#FFE27A']}
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
    backgroundColor: '#020204',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },

  markWrap: { width: 34, height: 34, position: 'relative' },
  markStroke: {
    position: 'absolute',
    left: 2,
    top: 2,
    width: 10,
    height: 25,
    borderRadius: 3,
    backgroundColor: '#ECECF1',
  },
  markStroke2: { left: 14 },
  markCross: {
    position: 'absolute',
    left: -1,
    top: 11,
    width: 29,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ECECF1',
  },

  headline: {
    color: '#fff',
    fontSize: 46,
    lineHeight: 52,
    fontWeight: '400',
    letterSpacing: -0.55,
  },
  headlineMuted: { color: '#7F808A', fontWeight: '400' },
  headlineStrong: { color: '#FFFFFF', fontWeight: '700' },

  ctaWrap: {
    borderRadius: 999,
    overflow: 'hidden',
    shadowColor: '#FF8D3A',
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 7,
  },
  cta: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  ctaText: {
    color: '#171311',
    fontSize: 22,
    fontWeight: '500',
  },

  secondary: {
    minHeight: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2A2C31',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06070A',
  },
  secondaryText: {
    color: '#D4D6DC',
    fontSize: 16,
    fontWeight: '400',
  },

  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
});
