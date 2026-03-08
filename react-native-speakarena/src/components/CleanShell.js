import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../theme/design';

export default function CleanShell({ children }) {
  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient colors={[palette.bg, palette.bg2]} style={StyleSheet.absoluteFill} />
      <View style={styles.blobA} />
      <View style={styles.blobB} />
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  inner: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  blobA: {
    position: 'absolute', top: -80, right: -40, width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(141,123,255,0.15)'
  },
  blobB: {
    position: 'absolute', top: 180, left: -60, width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(126,168,255,0.14)'
  },
});
