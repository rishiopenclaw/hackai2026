import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, radius } from '../theme/design';

export default function CleanCard({ children, style }) {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#F9F7FF']}
      style={[styles.card, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.inner}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#B7B5F7',
    shadowOpacity: 0.20,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    overflow: 'hidden',
  },
  inner: { padding: 16 },
});
