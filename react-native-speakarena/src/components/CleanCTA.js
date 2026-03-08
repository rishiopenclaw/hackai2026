import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, radius } from '../theme/design';

export function PrimaryPill({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, pressed && styles.pressed, style]}>
      <LinearGradient colors={[palette.accent, palette.accent2]} style={styles.primary}>
        <Text style={styles.primaryText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export function TextAction({ title, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.linkWrap, pressed && styles.pressed, style]}>
      <Text style={styles.link}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 999, overflow: 'hidden', alignSelf: 'flex-start' },
  primary: {
    minHeight: 40,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  linkWrap: { alignSelf: 'flex-start', paddingVertical: 6 },
  link: { color: palette.accent2, fontSize: 14, fontWeight: '700' },
  pressed: { opacity: 0.86, transform: [{ scale: 0.985 }] },
});
