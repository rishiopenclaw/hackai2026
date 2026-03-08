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
  const mobileMode = width <= 430;
  const shellWidth = mobileMode ? width : Math.min(width - 28, 390);

  return (
    <SafeAreaView style={styles.root}>
      <View style={[styles.phoneShell, mobileMode ? styles.phoneShellMobile : styles.phoneShellDesktop, { width: shellWidth }]}>
        <LinearGradient colors={['#B56D24', '#7A4318', '#2B1A12']} style={styles.hero}>
          <LinearGradient
            colors={['rgba(255,176,92,0.35)', 'rgba(255,120,40,0.16)', 'rgba(0,0,0,0)']}
            start={{ x: 0.05, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.geoA} />
          <View style={styles.geoB} />
          <View style={styles.geoC} />

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.86)']}
            start={{ x: 0.5, y: 0.55 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.heroFade}
          />

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
              colors={['#FF552D', '#FF7E35', '#FFE27C']}
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
    backgroundColor: '#0A0909',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneShell: {
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  phoneShellDesktop: {
    height: '92%',
    borderRadius: 42,
    borderWidth: 2,
    borderColor: '#2A2D33',
  },
  phoneShellMobile: {
    flex: 1,
    borderRadius: 0,
    borderWidth: 0,
  },

  hero: {
    flex: 1,
    position: 'relative',
  },
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 170,
  },
  geoA: {
    position: 'absolute',
    top: -28,
    left: -44,
    width: 250,
    height: 170,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 198, 110, 0.18)',
    transform: [{ rotate: '-16deg' }],
  },
  geoB: {
    position: 'absolute',
    top: 86,
    left: 88,
    width: 230,
    height: 210,
    borderRadius: 36,
    backgroundColor: 'rgba(18, 10, 8, 0.42)',
    transform: [{ rotate: '-30deg' }],
  },
  geoC: {
    position: 'absolute',
    top: 18,
    right: -40,
    width: 190,
    height: 240,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.30)',
    transform: [{ rotate: '21deg' }],
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
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
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
  headlineMuted: { color: '#7F808A', fontWeight: '400' },
  headlineStrong: { color: '#FFFFFF', fontWeight: '700' },

  ctaWrap: {
    borderRadius: 999,
    overflow: 'hidden',
    shadowColor: '#FF8A38',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 9,
  },
  cta: {
    minHeight: 52,
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
