import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function AppleCard({ children, style }) {
  return (
    <View style={[styles.outer, style]}>
      <BlurView intensity={30} tint="dark" style={styles.blur}>
        <View style={styles.inner}>{children}</View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.045)',
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  blur: { overflow: 'hidden' },
  inner: {
    padding: 14,
    backgroundColor: 'rgba(9,10,14,0.50)',
  },
});
