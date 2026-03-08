import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import ChirpMascot from '../components/ChirpMascot';

export default function DrillsScreen() {
  return (
    <View style={styles.container}>
      <ChirpMascot size={100} />
      <Text style={styles.title}>Articulation Drills</Text>
      <Text style={styles.sub}>Shadowing, pacing, and filler-word drills are ready for wiring.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 20 },
  title: { fontSize: 24, fontWeight: '900', color: colors.text },
  sub: { textAlign: 'center', color: colors.subtext, fontWeight: '600' },
});
