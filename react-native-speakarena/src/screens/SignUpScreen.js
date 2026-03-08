import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeroBackground from '../components/HeroBackground';
import AppleButton from '../components/AppleButton';

export default function SignUpScreen({ navigation }) {
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

          <AppleButton title="Sign up" onPress={() => navigation.replace('MainTabs')} />

          <AppleButton title="I have an account" secondary onPress={() => navigation.navigate('Login')} />
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


});
