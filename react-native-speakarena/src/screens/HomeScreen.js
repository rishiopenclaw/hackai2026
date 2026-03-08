import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { modules, user } from '../data/mock';
import ProgressBar from '../components/ProgressBar';
import ChirpMascot from '../components/ChirpMascot';

function Node({ item }) {
  const bg = item.status === 'completed' ? colors.green : item.status === 'available' ? colors.blue : '#BEC7D7';
  return (
    <Pressable style={styles.nodeWrap}>
      <View style={[styles.node, { backgroundColor: bg }]} />
      <Text style={styles.nodeTitle}>{item.title}</Text>
      <Text style={styles.nodeSub}>{item.subtitle}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={styles.topRow}>
        <View style={styles.pill}><Text style={styles.heart}>❤️ {user.hearts}</Text></View>
        <View style={styles.pill}><Text style={styles.streak}>🔥 {user.streak}</Text></View>
        <View style={[styles.pill, { marginLeft: 'auto' }]}><ChirpMascot size={30} /></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Level {user.level} • {user.xp} XP</Text>
        <ProgressBar progress={0.68} />
      </View>

      <Text style={styles.pathTitle}>Learning Path</Text>
      {modules.map((m, idx) => (
        <View key={m.id} style={[styles.zig, idx % 2 ? styles.right : styles.left]}>
          <Node item={m} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pill: { backgroundColor: colors.card, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  heart: { fontWeight: '800' },
  streak: { fontWeight: '800', color: colors.orange },
  card: { backgroundColor: colors.card, borderRadius: 24, padding: 16, gap: 10 },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  pathTitle: { fontSize: 24, fontWeight: '900', color: colors.text },
  zig: { width: '100%' },
  left: { alignItems: 'flex-start' },
  right: { alignItems: 'flex-end' },
  nodeWrap: { alignItems: 'center', width: 130 },
  node: { width: 84, height: 84, borderRadius: 50, marginBottom: 8 },
  nodeTitle: { fontWeight: '800', fontSize: 12, color: colors.text, textAlign: 'center' },
  nodeSub: { fontWeight: '600', fontSize: 11, color: colors.subtext, textAlign: 'center' },
});
