import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

export default function DuoButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, pressed && styles.pressed]}>
      <LinearGradient
        colors={[colors.orange, colors.orange2, colors.amber]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.top}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#6B360A',
    paddingBottom: 4,
  },
  top: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  text: { color: '#140D05', fontWeight: '900', fontSize: 16 },
  pressed: { transform: [{ scale: 0.985 }] },
});