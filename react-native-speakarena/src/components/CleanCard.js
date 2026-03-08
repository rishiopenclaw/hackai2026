import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, radius } from '../theme/design';

export default function CleanCard({ children, style }) {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.02)']}
      style={[styles.outer, style]}
    >
      <View style={styles.inner}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  inner: {
    backgroundColor: 'rgba(13,17,31,0.82)',
    padding: 16,
  },
});
