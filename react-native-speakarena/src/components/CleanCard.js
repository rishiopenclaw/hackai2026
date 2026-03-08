import React from 'react';
import { View, StyleSheet } from 'react-native';
import { palette, radius } from '../theme/design';

export default function CleanCard({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    backgroundColor: 'rgba(16,20,34,0.72)',
    padding: 14,
  },
});
