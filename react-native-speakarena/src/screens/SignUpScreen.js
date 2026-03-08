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
  const { width, height } = useWindowDimensions();
  const shellWidth = Math.min(width - 20, 390);
  const shellHeight = Math.min(height - 28, 844);

  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient colors={['#24180F', '#0C0B0B']} style={StyleSheet.absoluteFill} />

      <View style={[styles.phoneShell, { width: shellWidth, height: shellHeight }]}> 
        <LinearGradient colors={['#BA7228', '#76431B', '#1C1414']} style={styles.hero}>
          <LinearGradient
            colors={['rgba(255,191,109,0.30)', 'rgba(255,131,36,0.14)', 'rgba(0,0,0,0)']}
            start={{ x: 0.08, y: 0.02 }}
            end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          {/* reference-like intersecting rounded panels */}
          <View style={styles.shapeA} />
          <View style={styles.shapeB} />
          <View style={styles.shapeC} />

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.92)']}
            start={{ x: 0.5, y: 0.50 }}
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
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 190,
  },

  shapeA: {
    position: 'absolute',
    top: -40,
    left: -70,
    width: 270,
    height: 180,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 210, 133, 0.14)',
    transform: [{ rotate: '-18deg' }],
  },
  shapeB: {
    position: 'absolute',
    top: 70,
    left: 70,
    width: 250,
    height: 210,
    borderRadius: 46,
    backgroundColor: 'rgba(26, 15, 11, 0.45)',
    transform: [{ rotate: '-33deg' }],
  },
  shapeC: {
    position: 'absolute',
    top: -4,
    right: -54,
    width: 220,
    height: 250,
    borderRadius: 46,
    backgroundColor: 'rgba(0,0,0,0.28)',
    transform: [{ rotate: '26deg' }],
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
    paddingTop: 16,
    paddingBottom: 18,
    gap: 14,
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
    lineHeight: 50,
    fontWeight: '400',
    letterSpacing: -0.35,
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
