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
      <LinearGradient colors={['#2A1A10', '#0D0B0B']} style={StyleSheet.absoluteFill} />

      <View style={[styles.phoneShell, { width: shellWidth, height: shellHeight }]}>
        <LinearGradient colors={['#C07A2C', '#7A4519', '#1B1414']} style={styles.hero}>
          <LinearGradient
            colors={['rgba(255,196,110,0.28)', 'rgba(255,123,34,0.14)', 'rgba(0,0,0,0)']}
            start={{ x: 0.08, y: 0.02 }}
            end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          {/* match screenshot 2: broad intersecting rounded slabs */}
          <View style={styles.slabA} />
          <View style={styles.slabB} />
          <View style={styles.slabC} />

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.88)']}
            start={{ x: 0.5, y: 0.52 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.heroFade}
          />

          <View style={styles.statusRow}>
            <Text style={styles.statusText}>9:41</Text>
            <Text style={styles.statusIcons}>◔◔◔</Text>
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
    height: 210,
  },

  slabA: {
    position: 'absolute',
    top: -34,
    left: -110,
    width: 360,
    height: 126,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 208, 132, 0.15)',
    transform: [{ rotate: '-20deg' }],
  },
  slabB: {
    position: 'absolute',
    top: 68,
    left: 58,
    width: 120,
    height: 360,
    borderRadius: 32,
    backgroundColor: 'rgba(18, 10, 8, 0.42)',
    transform: [{ rotate: '-24deg' }],
  },
  slabC: {
    position: 'absolute',
    top: 146,
    right: -52,
    width: 248,
    height: 150,
    borderRadius: 34,
    backgroundColor: 'rgba(0,0,0,0.24)',
    transform: [{ rotate: '-28deg' }],
  },

  statusRow: {
    paddingHorizontal: 24,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  statusIcons: {
    color: '#fff',
    fontSize: 11,
    opacity: 0.9,
    letterSpacing: 1.5,
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
    fontSize: 30,
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
