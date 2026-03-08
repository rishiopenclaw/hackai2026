import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function ProgressBar({ progress = 0, fill = colors.orange }) {
  const clamped = Math.max(0, Math.min(progress, 1));
  return (
    <View style={styles.wrap}>
      <View style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: fill }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#2A3040',
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 999 },
});