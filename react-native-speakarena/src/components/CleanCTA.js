import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../theme/design';

export function PrimaryPill({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pillWrap, pressed && styles.pressed, style]}>
      <LinearGradient colors={[palette.accent2, palette.accent]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.pill}>
        <Text style={styles.pillText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function TextAction({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.textWrap, pressed && styles.pressed, style]}>
      <Text style={styles.textAction}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pillWrap: { borderRadius: 999, overflow: 'hidden', alignSelf: 'flex-start' },
  pill: {
    minHeight: 38,
    borderRadius: 999,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: { color: '#17120D', fontSize: 14, fontWeight: '700', letterSpacing: 0.2 },
  textWrap: { alignSelf: 'flex-start', paddingVertical: 4 },
  textAction: { color: '#C9D2E4', fontSize: 14, fontWeight: '600' },
  pressed: { opacity: 0.85 },
});
