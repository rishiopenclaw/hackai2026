import React from 'react';
import { View, StyleSheet } from 'react-native';
import { palette } from '../theme/design';

export default function CleanCard({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    padding: 14,
  },
});
