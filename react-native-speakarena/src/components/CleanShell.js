import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../theme/design';

export default function CleanShell({ children }) {
  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient colors={[palette.bg2, palette.bg]} style={StyleSheet.absoluteFill} />
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  inner: { flex: 1, paddingHorizontal: 20, paddingTop: 14 },
  glowTop: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -120,
    left: -80,
    backgroundColor: 'rgba(240,179,92,0.18)',
  },
  glowBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    bottom: -120,
    right: -80,
    backgroundColor: 'rgba(122,155,255,0.15)',
  },
});
