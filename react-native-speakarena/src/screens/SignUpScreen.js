import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
  const { width } = useWindowDimensions();
  const frameWidth = Math.min(width - 24, 390);

  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.phoneShell, { width: frameWidth }]}> 
        <LinearGradient colors={['#A9671E', '#7E461A', '#121012']} style={styles.hero}>
          <View style={styles.geoA} />
          <View style={styles.geoB} />
          <View style={styles.geoC} />
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>9:41</Text>
          </View>
        </LinearGradient>

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
              colors={['#FF6A2D', '#FFE680']}
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
    backgroundColor: '#0B0908',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  phoneShell: {
    height: '92%',
    borderRadius: 42,
    borderWidth: 2,
    borderColor: '#2A2D33',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  hero: {
    flex: 1,
    position: 'relative',
  },
  geoA: {
    position: 'absolute',
    top: -20,
    left: -40,
    width: 230,
    height: 160,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 195, 104, 0.16)',
    transform: [{ rotate: '-18deg' }],
  },
  geoB: {
    position: 'absolute',
    top: 80,
    left: 90,
    width: 220,
    height: 190,
    borderRadius: 34,
    backgroundColor: 'rgba(16, 10, 8, 0.34)',
    transform: [{ rotate: '-28deg' }],
  },
  geoC: {
    position: 'absolute',
    top: 24,
    right: -34,
    width: 180,
    height: 220,
    borderRadius: 36,
    backgroundColor: 'rgba(0,0,0,0.26)',
    transform: [{ rotate: '20deg' }],
  },
  statusRow: {
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPane: {
    backgroundColor: '#020204',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    gap: 16,
  },
  markWrap: { width: 40, height: 40, position: 'relative' },
  markStroke: {
    position: 'absolute',
    left: 2,
    top: 3,
    width: 12,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#ECECF1',
  },
  markStroke2: { left: 16 },
  markCross: {
    position: 'absolute',
    left: -2,
    top: 13,
    width: 34,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ECECF1',
  },
  headline: {
    color: '#fff',
    fontSize: 43,
    lineHeight: 52,
    fontWeight: '400',
    letterSpacing: -0.4,
  },
  headlineMuted: { color: '#83838F', fontWeight: '400' },
  headlineStrong: { color: '#FFFFFF', fontWeight: '700' },
  ctaWrap: { borderRadius: 999, overflow: 'hidden' },
  cta: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  ctaText: {
    color: '#141414',
    fontSize: 22,
    fontWeight: '500',
  },
  secondary: {
    minHeight: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2A2C31',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06070A',
  },
  secondaryText: {
    color: '#D4D6DC',
    fontSize: 20,
    fontWeight: '400',
  },
  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
});
