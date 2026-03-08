import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { modules, user } from '../data/mock';
import ProgressBar from '../components/ProgressBar';
import GlassCard from '../components/GlassCard';

function Node({ item }) {
  const glow = item.status === 'locked' ? ['#3B4255', '#242A39'] : [colors.orange, '#A64B10'];
  return (
    <Pressable style={styles.nodeWrap}>
      <LinearGradient colors={glow} style={styles.node} />
      <Text style={styles.nodeTitle}>{item.title}</Text>
      <Text style={styles.nodeSub}>{item.subtitle}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <LinearGradient colors={[colors.bg, '#0A0E16', '#1A1108']} style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={styles.topRow}>
          <GlassCard style={styles.pill}><Text style={styles.pillText}>❤️ {user.hearts}</Text></GlassCard>
          <GlassCard style={styles.pill}><Text style={styles.pillText}>🔥 {user.streak}</Text></GlassCard>
        </View>

        <GlassCard>
          <Text style={styles.title}>SpeakArena</Text>
          <Text style={styles.sub}>Level {user.level} • {user.xp} XP</Text>
          <ProgressBar progress={0.68} fill={colors.orange} />
        </GlassCard>

        <Text style={styles.pathTitle}>Learning Path</Text>
        {modules.map((m, idx) => (
          <View key={m.id} style={[styles.zig, idx % 2 ? styles.right : styles.left]}>
            <Node item={m} />
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRow: { flexDirection: 'row', gap: 10 },
  pill: { borderRadius: 999 },
  pillText: { color: colors.text, fontWeight: '800' },
  title: { fontSize: 30, fontWeight: '900', color: colors.text },
  sub: { color: colors.subtext, marginBottom: 10, fontWeight: '700' },
  pathTitle: { fontSize: 24, fontWeight: '900', color: colors.text },
  zig: { width: '100%' },
  left: { alignItems: 'flex-start' },
  right: { alignItems: 'flex-end' },
  nodeWrap: { alignItems: 'center', width: 138 },
  node: { width: 88, height: 88, borderRadius: 44, marginBottom: 8 },
  nodeTitle: { color: colors.text, fontWeight: '800', fontSize: 12, textAlign: 'center' },
  nodeSub: { color: colors.subtext, fontWeight: '600', fontSize: 11, textAlign: 'center' },
});