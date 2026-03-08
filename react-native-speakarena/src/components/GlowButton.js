import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export default function GlowButton({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [style, pressed && styles.pressed]}>
      <LinearGradient colors={colors.sunset} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.btn}>
        <Text style={styles.label}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    minHeight: 56,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: '#fff', fontWeight: '800', fontSize: 16 },
  pressed: { opacity: 0.92, transform: [{ scale: 0.988 }] },
});
