import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export default function GlassCard({ children, style }) {
  return (
    <LinearGradient
      colors={["rgba(255,255,255,0.07)", "rgba(255,255,255,0.02)"]}
      style={[styles.card, style]}
    >
      <View style={styles.inner}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  inner: {
    backgroundColor: 'rgba(9,12,18,0.7)',
    padding: 14,
  },
});