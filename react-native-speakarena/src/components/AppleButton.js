import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppleButton({ title, onPress, secondary = false, style }) {
  if (secondary) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.secondary, pressed && styles.pressed, style]}>
        <Text style={styles.secondaryText}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, pressed && styles.pressed, style]}>
      <LinearGradient colors={['#FF7A2D', '#FFB25B']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.primary}>
        <Text style={styles.primaryText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 999, overflow: 'hidden' },
  primary: { minHeight: 50, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#16130F', fontSize: 17, fontWeight: '600' },
  secondary: {
    minHeight: 50,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#232734',
    backgroundColor: '#0D0F15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { color: '#B0B6C2', fontSize: 16, fontWeight: '500' },
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
});
