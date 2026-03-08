import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function LogosTabIcon({ color }) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.dotLarge, { borderColor: color }]} />
      <View style={[styles.dotSmallLeft, { backgroundColor: color }]} />
      <View style={[styles.dotSmallRight, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotLarge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.2,
    backgroundColor: 'transparent',
  },
  dotSmallLeft: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    left: 1,
    bottom: 4,
  },
  dotSmallRight: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    right: 1,
    top: 4,
  },
});
