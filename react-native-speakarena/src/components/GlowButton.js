import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SUNSET = ['#FF4B2B', '#FF416C', '#FF9020'];

export default function GlowButton({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, pressed && styles.pressed, style]}>
      <View style={styles.glow} />
      <LinearGradient colors={SUNSET} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.btn}>
        <Text style={styles.label}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 30 },
  pressed: { transform: [{ scale: 0.985 }] },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    backgroundColor: '#FF7A2E',
    opacity: 0.28,
    transform: [{ scale: 1.07 }],
  },
  btn: {
    minHeight: 56,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF8A2B',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
