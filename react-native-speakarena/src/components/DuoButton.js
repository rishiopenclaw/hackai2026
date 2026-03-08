import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function DuoButton({ title, onPress, fill = colors.green, base = colors.greenDark }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, { backgroundColor: base }, pressed && styles.pressed]}>
      <Text style={[styles.top, { backgroundColor: fill }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  top: {
    color: 'white',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    paddingVertical: 14,
    borderRadius: 24,
  },
  pressed: { transform: [{ scale: 0.98 }] },
});
