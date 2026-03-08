import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatChip({ icon, label, value, color = '#FF9B4A' }) {
  return (
    <View style={styles.chip}>
      <View style={[styles.dot, { backgroundColor: `${color}22` }]}>{icon}</View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: '#8F98AB', fontSize: 11, fontWeight: '600' },
  value: { fontSize: 14, fontWeight: '700' },
});
