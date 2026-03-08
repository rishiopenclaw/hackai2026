import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

export default function MobileFrame({ children }) {
  const { width } = useWindowDimensions();
  const mobileWidth = Math.min(width, 410);

  return (
    <View style={styles.outer}>
      <View style={[styles.inner, { width: mobileWidth }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, alignItems: 'center' },
  inner: { flex: 1, width: '100%' },
});
