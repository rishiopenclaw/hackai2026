import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, radius } from '../theme/design';

export default function CleanCTA({ title, onPress, ghost = false, style }) {
  if (ghost) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.ghost, pressed && styles.pressed, style]}>
        <Text style={styles.ghostText}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, pressed && styles.pressed, style]}>
      <LinearGradient colors={[palette.accent2, palette.accent]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.primary}>
        <Text style={styles.primaryText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: radius.md, overflow: 'hidden' },
  primary: {
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#17120D', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  ghost: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.card2,
  },
  ghostText: { color: palette.text, fontSize: 15, fontWeight: '600' },
  pressed: { transform: [{ scale: 0.985 }], opacity: 0.95 },
});
