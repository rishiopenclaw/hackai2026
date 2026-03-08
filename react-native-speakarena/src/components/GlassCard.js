import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export default function GlassCard({ children, style, contentStyle }) {
  return (
    <View style={[styles.shell, style]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.075)', 'rgba(255,255,255,0.018)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={[styles.inner, contentStyle]}>{children}</View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.panelBorder,
    overflow: 'hidden',
    backgroundColor: colors.panel,
  },
  gradient: { borderRadius: 24 },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(7,8,12,0.64)',
  },
});
