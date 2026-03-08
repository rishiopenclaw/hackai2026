import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { palette } from '../theme/design';

export default function CleanCTA({ title, onPress, ghost = false, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [ghost ? styles.ghost : styles.primary, pressed && styles.pressed, style]}>
      <Text style={ghost ? styles.ghostText : styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#18140E', fontSize: 16, fontWeight: '700' },
  ghost: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surface2,
  },
  ghostText: { color: palette.text, fontSize: 15, fontWeight: '600' },
  pressed: { opacity: 0.9 },
});
