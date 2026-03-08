import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GlassCard({ children, style, contentStyle }) {
  return (
    <LinearGradient
      colors={[
        'rgba(255,255,255,0.09)',
        'rgba(255,255,255,0.03)',
        'rgba(255,255,255,0.02)',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.shell, style]}
    >
      <View style={[styles.inner, contentStyle]}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
    shadowColor: '#FF8A2B',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(9,10,14,0.62)',
  },
});
