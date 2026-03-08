import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function CardsTabIcon({ color }) {
  return (
    <View style={styles.grid}>
      <View style={[styles.tile, { backgroundColor: color }]} />
      <View style={[styles.tile, { backgroundColor: color }]} />
      <View style={[styles.tile, { backgroundColor: color }]} />
      <View style={[styles.tile, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  tile: {
    width: 9,
    height: 9,
    borderRadius: 3,
  },
});
